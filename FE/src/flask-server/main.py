import random
from data import responses


def get_response(message):
    message = message.lower().replace("?", "")
    if message in responses:
        return random.choice(responses[message])
    else:
        return random.choice(responses["default"])


print("Hello, I'm Chatbot. How can I help you today?")
while True:
    message = input("You: ")
    if message.lower() == "bye":
        print("Chatbot: Goodbye!")
        break
    else:
        response = get_response(message)
        print("Chatbot:", response)
