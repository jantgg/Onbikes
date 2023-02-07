class Question(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    question_1_license = db.Column(db.String(250), nullable=True)
    question_11_limitable = db.Column(db.String(250), nullable=True)
    question_2_wheels = db.Column(db.String(250), nullable=True)
    question_3_surface = db.Column(db.String(250), nullable=True)
    question_31_surface_offroad = db.Column(db.String(250), nullable=True)
    question_311_motor_offroad = db.Column(db.String(250), nullable=True)
    question_32_custom = db.Column(db.String(250), nullable=True)
    question_321_refrigeration = db.Column(db.String(250), nullable=True)
    question_4_comodity = db.Column(db.String(250), nullable=True)
    question_5_style = db.Column(db.String(250), nullable=True)
    question_6_price = db.Column(db.String(250), nullable=True)
    question_7_new = db.Column(db.String(250), nullable=True)
    question_8_response = db.Column(db.String(250), nullable=True)
    question_9_reliability = db.Column(db.String(250), nullable=True)
    question_10_power = db.Column(db.String(250), nullable=True)
    question_11_armor = db.Column(db.String(250), nullable=True)
    answers = db.relationship('Answer', backref='question')

    def __repr__(self):
        return f'Questions: {self.question_1_license}'

    def serialize(self):
        return {
            "id": self.id,
            "question_1_license": self.question_1_license,
            "question_11_limitable": self.question_11_limitable,
            "question_2_wheels": self.question_2_wheels,
            "question_3_surface": self.question_3_surface,
            "question_31_surface_offroad": self.question_31_surface_offroad,
            "question_311_motor_offroad": self.question_311_motor_offroad,
            "question_32_custom": self.question_32_custom,
            "question_321_refrigeration": self.question_321_refrigeration,
            "question_4_comodity": self.question_4_comodity,
            "question_5_style": self.question_5_style,
            "question_6_price": self.question_6_price,
            "question_7_new": self.question_7_new,
            "question_8_response": self.question_8_response,
            "question_9_reliability": self.question_9_reliability,
            "question_10_power": self.question_10_power,
            "question_11_armor": self.question_11_armor
        }


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_1_license = db.Column(db.String(250), nullable=True)
    answer_11_limitable = db.Column(db.String(250), nullable=True)
    answer_2_wheels = db.Column(db.String(250), nullable=True)
    answer_3_surface = db.Column(db.String(250), nullable=True)
    answer_31_surface_offroad = db.Column(db.String(250), nullable=True)
    answer_311_motor_offroad = db.Column(db.String(250), nullable=True)
    answer_32_custom = db.Column(db.String(250), nullable=True)
    answer_321_refrigeration = db.Column(db.String(250), nullable=True)
    answer_4_comodity = db.Column(db.String(250), nullable=True)
    answer_5_style = db.Column(db.String(250), nullable=True)
    answer_6_price = db.Column(db.String(250), nullable=True)
    answer_7_new = db.Column(db.String(250), nullable=True)
    answer_8_response = db.Column(db.String(250), nullable=True)
    answer_9_reliability = db.Column(db.String(250), nullable=True)
    answer_10_power = db.Column(db.String(250), nullable=True)
    answer_11_armor = db.Column(db.String(250), nullable=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))

    def __repr__(self):
        return f'{self.answer_1_license}'

    def serialize(self):
        return {
            "id": self.id,
            "answer_1_license": self.answer_1_license,
            "answer_11_limitable": self.answer_11_limitable,
            "answer_2_wheels": self.answer_2_wheels,
            "answer_3_surface": self.answer_3_surface,
            "answer_31_surface_offroad": self.answer_31_surface_offroad,
            "answer_311_motor_offroad": self.answer_311_motor_offroad,
            "answer_32_custom": self.answer_32_custom,
            "answer_321_refrigeration": self.answer_321_refrigeration,
            "answer_4_comodity": self.answer_4_comodity,
            "answer_5_style": self.answer_5_style,
            "answer_6_price": self.answer_6_price,
            "answer_7_new": self.answer_7_new,
            "answer_8_response": self.answer_8_response,
            "answer_9_reliability": self.answer_9_reliability,
            "answer_10_power": self.answer_10_power,
            "answer_11_armor": self.answer_11_armor
        }

# < -------------------------------------------------------------------------------------------------------------------- >

class Question(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(250), nullable=True)
    text_question = db.Column(db.String(250), nullable=True)
    answers = db.relationship('Answer', backref='question')

    def __repr__(self):
        return f'Questions: {self.question}'

    def serialize(self):
        return {
            "id": self.id,
            "question": self.question,
            "text_question": self.text_question
        }


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(250), nullable=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))

    def __repr__(self):
        return f'{self.answer}'

    def serialize(self):
        return {
            "id": self.id,
            "answer": self.answer
        }