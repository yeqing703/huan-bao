from flask import Flask, request,jsonify ,send_from_directory
from flask_sqlalchemy import SQLAlchemy
import random
from flask_cors import CORS
from datetime import datetime
import os
from flask_mail import Mail,  Message as MailMessage 
from datetime import datetime
from bs4 import BeautifulSoup
import requests
from openai import OpenAI


# 初始化 Flask 应用
app = Flask(__name__, static_folder="../") 
CORS(app)  # 允许跨域请求

comments = []  # 临时存储留言

# 配置 SQLAlchemy 连接 MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345678Yq@localhost/eco_website?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 头像列表
AVATAR_LIST = [
    "/img/avatar0.png", "/img/avatar6.png", "/img/avatar2.png",
    "/img/avatar3.png", "/img/avatar4.png", "/img/avatar7.png"
]

# 定义留言表
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ename = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    avatar = db.Column(db.String(255), nullable=False, default="/img/avatar0.png")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Message {self.ename}>'

# 创建数据库表
with app.app_context():
    db.create_all()

# 首页
@app.route('/')
def home():
    return "欢迎来到环保网站的后端！"

#加载网页的网站图标
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


# 添加留言
@app.route('/add_comment', methods=['POST'])
def add_comment():
    try:
        data = request.get_json()
        ename = data.get('ename')
        content = data.get('content')

        if not data or 'ename' not in data or 'content' not in data:
            return jsonify({"status": "error", "message": "缺少名字或内容"}), 400

        # 随机选择头像
        avatar = random.choice(AVATAR_LIST) if 'avatar' not in data else data['avatar']

        # 创建新的留言并保存到数据库
        new_message = Message(ename=ename, content=content, avatar=avatar)
        db.session.add(new_message)
        db.session.commit()  # 提交到数据库

        print("留言成功，提交到数据库:", new_message)

        return jsonify({"status": "success", "message": "恭喜您留言成功！", "comment": {
            "ename": new_message.ename,
            "content": new_message.content,
            "avatar": new_message.avatar
        }})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

#获取留言
@app.route('/comments', methods=['GET'])
def get_comments():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([{
        'ename': msg.ename,
        'content': msg.content,
        'avatar': msg.avatar,
        'created_at': msg.created_at.strftime('%Y-%m-%d %H:%M:%S')
    } for msg in messages])


#发送邮件功能
# 邮件服务器配置（使用 SMTP 发送邮件）
app.config['MAIL_SERVER'] = 'smtp.qq.com' 
app.config['MAIL_PORT'] = 587  # 端口号
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = '2606659976@qq.com'  # 你的邮箱
app.config['MAIL_PASSWORD'] = 'fuqurjvlrhnuebeh'  # SMTP授权码

mail = Mail(app)

# 定义“联系工作人员”表
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ContactMessage {self.email}>'

# 创建数据库表
with app.app_context():
    db.create_all()

#接收用户意见
@app.route('/contact', methods=['POST'])
def contact_staff():
    try:
        data = request.get_json()
        email = data.get('email')
        message_content = data.get('message')

        if not email or not message_content:
            return jsonify({'status': 'error', 'message': '邮箱和意见不能为空！'}), 400

        # 存入数据库
        new_contact = ContactMessage(email=email, message=message_content)
        db.session.add(new_contact)
        db.session.commit()
        print(f"{email} 的留言已存入数据库")

        # 发送邮件
        msg = MailMessage(
            "环保网站 - 用户意见反馈",
            sender=app.config['MAIL_USERNAME'],
            recipients=["2606659976@qq.com"],
            body=f"来自 {email} 的用户留言：\n\n{message_content}"
        )
        mail.send(msg)
        print("邮件发送成功")

        return jsonify({'status': 'success', 'message': '您的留言已提交，并已发送给工作人员！'})

    except Exception as e:
        print(f"服务器错误: {str(e)}") 
        return jsonify({'status': 'error', 'message': str(e)}), 500

# 定义报名表
class Signup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username =db.Column(db.Text,nullable=False)
    email = db.Column(db.String(120), nullable=False)
    address = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

#志愿者报名
@app.route('/signup', methods=['POST'])
def add_signup():
    try:
        data = request.get_json()
        username =data.get('username')
        email = data.get('email')
        address = data.get('address')

        if not username or not email or not address:
                return jsonify({'status': 'error', 'message': '不能为空！'}), 400
        
        # 报名新的用户并保存到数据库
        new_apply = Signup(username=username,email=email,address=address)
        db.session.add(new_apply)
        db.session.commit()  # 提交到数据库

        print("报名成功，提交到数据库:",new_apply) 

        return jsonify({"status": "success", "message": "恭喜您报名成功！", "comment": {
            "username": new_apply.username,
            "email": new_apply.email,
            "address": new_apply.address
        }})

    except Exception as e:
        print(f"服务器错误: {str(e)}") 
        return jsonify({'status': 'error', 'message': str(e)}), 500

#获取报名信息
@app.route('/get_signup', methods=['GET'])
def get_signup():
    messages = Signup.query.order_by(Signup.created_at.desc()).all()
    return jsonify([{
        'username': sign.username,
        'email': sign.email,
        'address': sign.address,
        'created_at': sign.created_at.strftime('%Y-%m-%d %H:%M:%S')
    } for sign in messages])


#获取智能问答
#访问接口进行身份验证
client = OpenAI(api_key="sk-dc7f14bb841542f3abd258f180481396", base_url="https://api.deepseek.com/v1")

#发送请求
@app.route('/ask', methods=['POST'])
def ask_deepseek():
    # 获取前端发送的问题
    data = request.get_json()
    user_question = data.get('question', '')
    
    if not user_question:
        return jsonify({"error": "问题不能为空"}), 400
    
    try:
        # 发送请求到 DeepSeek
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "你是一个专业知识解答客户助手，请用正式的语气回答用户的问题"},
                {"role": "user", "content": user_question},
            ],
            stream=False
        )
        
        answer = response.choices[0].message.content
        return jsonify({"answer": answer})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# 运行服务器
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)


