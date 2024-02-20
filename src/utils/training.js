export const defaultTraining = {
  pipeline: [
    {
      name: "WhitespaceTokenizer",
    },
    {
      name: "RegexFeaturizer",
    },
    {
      name: "LexicalSyntacticFeaturizer",
    },
    {
      name: "CountVectorsFeaturizer",
    },
    {
      name: "CountVectorsFeaturizer",
      analyzer: "char_wb",
      min_ngram: 1,
      max_ngram: 4,
    },
    {
      name: "DIETClassifier",
      epochs: 100,
      constrain_similarities: true,
    },
    {
      name: "EntitySynonymMapper",
    },
    {
      name: "ResponseSelector",
      epochs: 100,
      constrain_similarities: true,
    },
    {
      name: "FallbackClassifier",
      threshold: 0.9,
      ambiguity_threshold: 0.1,
    },
  ],
  policies: [
    {
      name: "MemoizationPolicy",
    },
    {
      name: "RulePolicy",
    },
    {
      name: "TEDPolicy",
      max_history: 20,
      epochs: 100,
      constrain_similarities: true,
    },
  ],
  intents: [
    "affirm",
    "ask_services",
    "bot_challenge",
    "create_ticket",
    "deny",
    "get_knowledges",
    "goodbye",
    "greet",
    "nlu_fallback",
    "stop",
    "thank",
    "ask_google",
    "ask_direction",
    "ask_campus_direction",
    "ask_where_is_campus",
    "ask_timetable",
    "ask_fee",
    "ask_career_path",
    "get_career_path",
    "ask_student_id",
    "ask_course",
    "ask_enrollments",
    "ask_name",
  ],
  entities: ["knowledge", "course"],
  slots: {
    ticket_subject: {
      type: "text",
      influence_conversation: true,
      mappings: [
        {
          type: "from_text",
          conditions: [
            {
              active_loop: "ticket_form",
              requested_slot: "ticket_subject",
            },
          ],
        },
      ],
    },
    ticket_detail: {
      type: "text",
      influence_conversation: true,
      mappings: [
        {
          type: "from_text",
          conditions: [
            {
              active_loop: "ticket_form",
              requested_slot: "ticket_detail",
            },
          ],
        },
      ],
    },
  },
  actions: [
    "action_get_knowledges",
    "utter_did_that_help",
    "utter_create_ticket",
    "action_default_fallback",
    "utter_ask_ticket_subject",
    "utter_ask_ticket_detail",
    "submit_ticket_form",
    "cancel_ticket_form",
    "action_map_direction",
    "action_campus_direction",
    "action_get_timetable",
    "action_get_fee",
    "action_get_career_path",
    "action_get_student_id",
    "action_get_enrollments",
    "action_get_course",
    "action_get_name",
  ],
  forms: {
    ticket_form: {
      required_slots: ["ticket_subject", "ticket_detail"],
    },
  },
  e2e_actions: [],
  responses: {
    utter_greet: [
      {
        text: "Hello! I'm your student service bot. How can I assist you today?",
      },
      {
        text: "Hey there! I'm here to help you with any student-related queries.",
      },
      {
        text: "Hi! Welcome to the student service bot. What do you need help with?",
      },
      {
        text: "Good day! I'm the student service bot. How may I be of assistance?",
      },
      {
        text: "Greetings! I'm your friendly student service bot. How can I support you?",
      },
      {
        text: "Hi there! Need help with anything as a student? I'm here for you!",
      },
      {
        text: "Hey! I'm the student service bot. What can I do for you today?",
      },
      {
        text: "Good to see you! I'm the student service bot. How can I assist you?",
      },
      {
        text: "Welcome! I'm your go-to student service bot. What's on your mind?",
      },
      {
        text: "Hey! I'm here as your student service bot. How can I assist you today?",
      },
    ],
    utter_did_that_help: [
      {
        text: "Did that help you?",
      },
      {
        text: "Was that helpful for you?",
      },
      {
        text: "Did that assist you in any way?",
      },
      {
        text: "Was that what you needed?",
      },
      {
        text: "Did that answer your question?",
      },
      {
        text: "Was that useful for you?",
      },
      {
        text: "Did that resolve your concern?",
      },
      {
        text: "Was that what you were looking for?",
      },
      {
        text: "Did that support you?",
      },
      {
        text: "Was that response helpful?",
      },
      {
        text: "Did that address your issue?",
      },
      {
        text: "Did that provide the solution you were after?",
      },
    ],
    utter_glad: [
      {
        text: "Glad that I can help!",
      },
      {
        text: "Happy to assist!",
      },
      {
        text: "Glad I could be of help!",
      },
      {
        text: "I'm pleased to have assisted!",
      },
      {
        text: "Happy that I could help!",
      },
      {
        text: "I'm delighted I could assist!",
      },
      {
        text: "Happy that I was helpful!",
      },
      {
        text: "Glad to lend a hand!",
      },
      {
        text: "Pleased to have supported you!",
      },
      {
        text: "Glad to be of aid!",
      },
      {
        text: "Happy to be of service!",
      },
      {
        text: "Thrilled that I could help!",
      },
      {
        text: "Glad to offer my support!",
      },
      {
        text: "Happy to have supported you!",
      },
    ],
    utter_sorry: [
      {
        text: "Sorry I can't help you.",
      },
      {
        text: "Apologies, I'm unable to assist.",
      },
      {
        text: "Regrettably, I can't aid you.",
      },
      {
        text: "I'm sorry, I can't provide assistance.",
      },
      {
        text: "Unfortunately, I can't offer help.",
      },
      {
        text: "Apologies, I'm not able to assist you.",
      },
      {
        text: "Sorry, I'm unable to support you.",
      },
      {
        text: "I regret to inform you I can't help.",
      },
      {
        text: "I'm sorry, I'm unable to provide guidance.",
      },
      {
        text: "Regrettably, I can't offer support.",
      },
      {
        text: "Apologies, I can't give you the help you need.",
      },
      {
        text: "Unfortunately, I'm not capable of providing assistance.",
      },
      {
        text: "Sorry, I can't assist you with that.",
      },
      {
        text: "Apologies, I'm not equipped to help.",
      },
      {
        text: "Unfortunately, I'm not in a position to assist.",
      },
      {
        text: "I'm sorry, I'm not able to give support.",
      },
      {
        text: "Regrettably, I can't offer the help you need.",
      },
      {
        text: "Sorry, I'm not capable of assisting.",
      },
      {
        text: "Apologies, I can't support you with that.",
      },
      {
        text: "Unfortunately, I can't be of assistance.",
      },
    ],
    utter_welcome: [
      {
        text: "You're welcome!",
      },
      {
        text: "Welcome!",
      },
      {
        text: "You're always welcome!",
      },
      {
        text: "Glad to help!",
      },
      {
        text: "Always here to assist!",
      },
      {
        text: "You're most welcome!",
      },
      {
        text: "Happy to help!",
      },
      {
        text: "My pleasure!",
      },
      {
        text: "No problem at all!",
      },
      {
        text: "Always at your service!",
      },
      {
        text: "It's my pleasure to assist you!",
      },
      {
        text: "Glad to be of help!",
      },
    ],
    utter_goodbye: [
      {
        text: "Bye",
      },
      {
        text: "Goodbye",
      },
      {
        text: "Catch you later",
      },
      {
        text: "See you soon",
      },
      {
        text: "Take care",
      },
      {
        text: "Farewell",
      },
      {
        text: "See you next time",
      },
      {
        text: "Bye-bye",
      },
    ],
    utter_iamabot: [
      {
        text: "I am a chatbot. I'm here to provide information, answer questions, and assist with a wide range of topics to the best of my abilities. If you have any questions or need assistance, feel free to ask!",
      },
      {
        text: "I am a chatbot. I'm here to provide information and assist with a variety of inquiries to the best of my ability. How can I help you today?",
      },
      {
        text: "I am a chatbot. I'm here to help and provide information to the best of my ability. If you have any questions, feel free to ask!",
      },
    ],
    utter_cant_answer: [
      {
        text: "I'm afraid I can't assist with that inquiry; it doesn't align with my guidelines.",
      },
      {
        text: "This request falls outside the scope of what I can address, sorry.",
      },
      {
        text: "I'm designed to avoid answering such queries, for safety reasons.",
      },
      {
        text: "I can't provide information on this topic for safety and policy reasons.",
      },
      {
        text: "I'm unable to engage with this type of question due to safety measures.",
      },
      {
        text: "This request is not something I'm permitted to respond to.",
      },
      {
        text: "I'm programmed to refrain from discussing such topics for safety purposes.",
      },
      {
        text: "I'm unable to assist with this question as it violates safety guidelines.",
      },
      {
        text: "Apologies, but discussing this is against my guidelines for safety reasons.",
      },
      {
        text: "I'm restricted from engaging in this topic to ensure safety protocols.",
      },
      {
        text: "I'm sorry, but this falls under the category of queries I can't address.",
      },
      {
        text: "I'm programmed to avoid discussing such matters to maintain safety.",
      },
      {
        text: "I'm unable to assist with this due to safety and security concerns.",
      },
      {
        text: "I'm unable to proceed with this query as it breaches safety guidelines.",
      },
      {
        text: "For safety reasons, I'm unable to respond to this particular request.",
      },
      {
        text: "I'm designed to abstain from discussing such topics to ensure safety.",
      },
      {
        text: "Sorry I can't answer this type of question. It violates my safety guidelines.",
      },
      {
        text: "I'm programmed to steer clear of such queries for safety purposes.",
      },
      {
        text: "Sorry, but this topic is outside my boundaries due to safety guidelines.",
      },
      {
        text: "I can't address this as it contradicts my safety protocols.",
      },
    ],
    utter_english_only: [
      {
        text: "Sorry, I can only understand english.",
      },
      {
        text: "I'm only capable of understanding English, apologies.",
      },
      {
        text: "My abilities are limited to comprehending English, I'm afraid.",
      },
      {
        text: "I can only process and understand information in English.",
      },
      {
        text: "English is the only language I'm equipped to understand, sorry.",
      },
      {
        text: "Unfortunately, I'm restricted to understanding English.",
      },
      {
        text: "I'm solely programmed to comprehend and respond in English.",
      },
      {
        text: "Regrettably, I can only engage in conversations conducted in English.",
      },
      {
        text: "My capacity is confined to understanding the English language.",
      },
      {
        text: "Apologies, I'm designed exclusively for understanding English.",
      },
      {
        text: "I'm only fluent in processing and comprehending English.",
      },
      {
        text: "My capabilities are confined to interpreting and responding in English.",
      },
      {
        text: "I can't comprehend languages other than English, sorry.",
      },
      {
        text: "Engaging in any language other than English is beyond my capabilities.",
      },
      {
        text: "I'm restricted to understanding and responding in English alone.",
      },
      {
        text: "Regrettably, I'm limited to understanding only the English language.",
      },
      {
        text: "Understanding languages other than English isn't within my capabilities.",
      },
      {
        text: "I'm specifically programmed to understand and communicate in English.",
      },
      {
        text: "Engaging in languages other than English is outside my scope.",
      },
      {
        text: "I'm only proficient in understanding and communicating in English.",
      },
      {
        text: "My understanding is confined to the English language, apologies.",
      },
    ],
    utter_rephrase: [
      {
        text: "I am sorry, I did not quite understand thant. Could you rephrase it?",
      },
      {
        text: "Sorry, didn't get that. Can you rephrase?",
      },
      {
        text: "I'm lost, can you say it differently?",
      },
      {
        text: "Didn't catch that, mind rephrasing?",
      },
      {
        text: "Huh? Could you rephrase, please?",
      },
      {
        text: "Sorry, can you rephrase that?",
      },
      {
        text: "Didn't understand, try rephrasing?",
      },
      {
        text: "Can you say that in another way, please?",
      },
      {
        text: "Didn't quite get it, rephrase?",
      },
      {
        text: "Didn't follow, can you rephrase that?",
      },
      {
        text: "Say that again differently, please?",
      },
      {
        text: "Not clear, can you rephrase that?",
      },
      {
        text: "Can you explain that differently?",
      },
      {
        text: "Didn't catch, please rephrase?",
      },
      {
        text: "Lost me there, rephrase, please?",
      },
      {
        text: "Didn't get it, rephrase that for me?",
      },
      {
        text: "Say that in a different way, please?",
      },
    ],
    utter_default_fallback: [
      {
        text: "Sorry I can't help you with that. You can ask me something related to academic guidance, enrollment support, or counseling.",
      },
      {
        text: "Sorry, I'm not able to assist with that. Feel free to ask about academic guidance, enrollment support, or counseling.",
      },
      {
        text: "My apologies, I can't help with that. Ask me anything about academic guidance, enrollment support, or counseling.",
      },
      {
        text: "I'm afraid I can't assist with that. You can inquire about academic guidance, enrollment support, or counseling.",
      },
      {
        text: "I'm not equipped to help with that. Feel free to ask about academic guidance, enrollment support, or counseling instead.",
      },
      {
        text: "Unfortunately, I can't assist with that. You may ask me about academic guidance, enrollment support, or counseling.",
      },
      {
        text: "I'm not programmed to handle that. Ask me something related to academic guidance, enrollment support, or counseling.",
      },
      {
        text: "I'm sorry, that's beyond my capabilities. Ask about academic guidance, enrollment support, or counseling for assistance.",
      },
      {
        text: "Sorry, that's not something I can assist with. Inquire about academic guidance, enrollment support, or counseling instead.",
      },
      {
        text: "Apologies, I'm unable to help with that. Ask me about academic guidance, enrollment support, or counseling for assistance.",
      },
      {
        text: "I'm not sure how to assist with that. Ask about academic guidance, enrollment support, or counseling instead.",
      },
    ],
    utter_services_included: [
      {
        text: "Our included services range from academic guidance, enrollment support, to counseling. How can I assist you further?",
      },
      {
        text: "We provide a variety of services including academic support, enrollment guidance, and counseling. What do you need help with today?",
      },
      {
        text: "Included in our services are academic advice, enrollment assistance, and counseling. How may I support you?",
      },
      {
        text: "Our services encompass academic guidance, enrollment help, and counseling sessions. How can I assist you today?",
      },
      {
        text: "We offer a wide range of services from academic support, enrollment guidance to counseling sessions. How can I help you?",
      },
    ],
    utter_campus_located: [
      {
        text: "The school is located at 461 Clementi Rd, Singapore 599491.",
      },
    ],
    utter_create_ticket: [
      {
        text: "Do you want to create ticket to ask the staff directly?",
      },
    ],
    utter_ask_ticket_subject: [
      {
        text: "Type in your ticket subject.",
      },
    ],
    utter_ask_ticket_detail: [
      {
        text: "Type in your ticket message.",
      },
    ],
    utter_ticket_info: [
      {
        text: "This is your ticket:\n\nSubject: {ticket_subject}\n\nDetails: \n{ticket_detail}\n",
      },
    ],
    utter_ticket_confirmation: [
      {
        text: "Do you want to create this ticket?",
      },
    ],
    utter_ticket_cancel: [
      {
        text: "The ticket is cancelled. You may ask me to create the ticket again if you changed your mind.",
      },
    ],
  },
  session_config: {
    session_expiration_time: 60,
    carry_over_slots_to_new_session: true,
  },
  nlu: [
    {
      intent: "greet",
      examples:
        "- Hiya\n- Hey\n- Morning\n- Howdy\n- Heya\n- Wassup\n- Sup\n- Yo\n- G'day\n- 'Morning\n- Hi there\n- Helloo\n- Heyyy\n- Mornin'\n- Hola\n- Aloha\n- Heyo\n- How's it going\n- What's up\n- Good day\n- Hey, hi\n- Hi hi\n- Hihi\n- Heyhey\n- Hey hey\n- Heyo!\n- Hi :)\n- Hello!\n- Greetings\n- Yo!\n- Hey friend\n- Morning!\n- Hi! :)\n- Hey hey hey\n- Howdy!\n- Hi there!\n- Hey you\n- Hellooo\n- Hey! :)\n- Hi hi!\n- G'day mate\n- Heyo there\n- Hi hi hi\n- Good morning!\n- Hey buddy\n- Hi there! :)\n- :)\n- yo\n- whatssup\n",
    },
    {
      intent: "goodbye",
      examples:
        "- see you\n- good by\n- cee you later\n- good night\n- bye\n- goodbye\n- have a nice day\n- see you around\n- bye bye\n- see you later\n- bb\n- quit\n- close\n",
    },
    {
      intent: "thank",
      examples:
        "- thx\n- Thanx a lot\n- thanks a bunch\n- Thanks a mill\n- You're awesome, thanks!\n- Thank you so much!!\n- You're a star, thx!\n- Thankssssssss!\n- Thaaaaanks\n- You're amazinggg, thanx\n- Thank youuuu :)\n- Much appreciated, thanks!\n- You rock, thanks\n- Thanks a bunchhhh\n- Thank you v much\n- You're a lifesaver, thx!\n- Thanksssss a lot\n- Thanks you're the best!\n- Thanks a tonnn\n- Thank youuuu so much!\n- Thanks for your help ;)\n- You're awesome, thx\n- Thank youuuu a million!\n- Thaaaank you\n- Thanks a millionnn\n- Much appreciated, thank you\n- You're a legend, thanks\n- You're amazinggg, thank you!\n- Thankss a lot\n- You rockkk\n- Thanks a bunchhhh!\n- Thankss for your help\n- Thank youuuu so much!!\n- Thank youuu, you're the best!\n- Thaaaank youuu\n- Thank you a millionnn\n- Thank youuu so much!!\n- Thanks a mill ;)\n- You're a legend, thank you\n- You're amazinggg, thanks!\n- Thankssss a lot\n- You rockkk, thanks\n- Thank youuuu a bunch!\n- Thaaaanks for your help\n- Thank youuuu, much appreciated\n- ty\n",
    },
    {
      intent: "affirm",
      examples:
        "- ya\n- yes\n- yeah\n- sure\n- absolutely\n- of course\n- indeed\n- yep\n- definitely\n- certainly\n- that's right\n- okay\n",
    },
    {
      intent: "deny",
      examples:
        "- no\n- nope\n- nah\n- not really\n- I don't think so\n- definitely not\n- sorry, I can't\n- I disagree\n- negative\n- I'll pass\n- not at all\n- not interested\n- never\n",
    },
    {
      intent: "stop",
      examples:
        "- stop\n- cancel\n- quit\n- end\n- exit\n- I want to stop\n- Please cancel this\n- Quit this conversation\n- End it here\n- Exit now\n",
    },
    {
      intent: "bot_challenge",
      examples:
        "- r u a bot?\n- are you real?\n- you're not human, right?\n- am I speaking to a real person?\n- are u a human?\n- are you AI?\n- u a bot?\n- am I chatting with a person?\n- are you a person or bot?\n- am I talking to a real human?\n- are you a human or machine?\n- r u human?\n- u a real person?\n- am I speaking with a bot?\n- are you an AI?\n- u human or bot?\n- am I talking to a real human or AI?\n- r u a human or AI?\n- am I talking to a bot or human?\n- are you a person or machine?\n- u a real human?\n- am I speaking to a human or bot?\n- r u a real person?\n- are you human or AI?\n- am I talking to a human or AI?\n- r u a person or bot?\n- are u a real human?\n- am I speaking with a human or bot?\n- r u human or machine?\n- are you a person or AI?\n- am I chatting with a human or bot?\n- are u human or machine?\n- am I talking to a real person or machine?\n- are you a person or not?\n- am I speaking to a human or a robot?\n- r u human or not?\n- are you a human or not?\n- u a real person or not?\n- am I talking to a bot or not?\n- r u a person or not?\n- are you a human or a machine?\n- am I talking to a human or a AI?\n",
    },
    {
      intent: "ask_services",
      examples:
        "- How can you help me?\n- What services do you offer?\n- What kind of stuff do you guys do?\n- Can you help me out with something?\n- I need some info about what you offer\n- Can you assist me with anything?\n- What exactly does this service cover?\n- Can you tell me what services you've got?\n- Could you help me with stuff from your service?\n- I need some help, what do you guys offer?\n- Just wondering, what's your service all about?\n- What's the deal with your service's offerings?\n",
    },
    {
      intent: "get_knowledges",
      examples:
        "- How can I make [payment](knowledge)?\n- How to make [payment](knowledge)?\n- How do I [enroll](knowledge) for classes?\n- How can I [apply for financial aid](knowledge)?\n- Where can I find the [library](knowledge) and its resources?\n- What [clubs and organizations](knowledge) are available on campus?\n- Where is the [student center](knowledge) located, and what services do they offer?\n- How do I [schedule an appointment](knowledge) with an academic advisor?\n- Can you provide information about [career services](knowledge) available to students?\n- What are the [academic support resources](knowledge) available on campus?\n- Where can I find [internship](knowledge) opportunities related to my field of study?\n- What are the [transportation](knowledge) options to the school?\n- How do I access campus [wifi](knowledge)?\n- How do I access campus [wi-fi](knowledge)?\n- Can you provide information about [study abroad](knowledge) programs offered by the university?\n- What [events](knowledge) and activities are happening on campus this week?\n- Where can I find [tutoring services](knowledge) for my courses?\n- What [academic and career workshops](knowledge) are offered by the university?\n- How can I request academic [accommodations](knowledge) for disabilities?\n- Where can I find information about [graduation](knowledge) and commencement ceremonies?\n- How do I access the [gym](knowledge) and recreational facilities on campus?\n- How do I [report](knowledge) a problem to school?\n",
    },
    {
      intent: "create_ticket",
      examples:
        "- I want to create a ticket\n- I want to talk with the staff\n- I want to talk with a human\n- I want to talk to real person\n- Talk with a real person\n- I want a live chat\n- I need to talk with real person\n- I need to talk with a human\n- I need live chat\n- How can I talk to a staff\n- Help me write a ticket\n",
    },
    {
      intent: "ask_google",
      examples:
        "- pass this question to Gemini\n- transfer this query to Gemini\n- forward to Gemini for clarification\n- I want to talk with Gemini\n- connect me with Gemini\n- can you help me speak with Gemini?\n- please get Gemini's input on this\n- initiate a conversation with Gemini\n- direct this to Gemini for assistance\n- I am sad\n- feeling down\n- experiencing sadness\n- I'm feeling blue\n- feeling a bit low\n- help me with mathematics\n- I need assistance with math\n- can you assist me with mathematical problems?\n- struggling with a math concept\n- could you help me understand this math problem?\n- I have some math questions\n- I need help with programming\n- Can you assist me with coding?\n- struggling with a programming assignment\n- I have a coding problem to solve\n- I'm having trouble with my computer\n- need assistance with troubleshooting\n- I have a problem with my internet connection\n",
    },
    {
      intent: "ask_direction",
      examples:
        "- how to go to my tutorial room\n- where is my tutor room\n- where is my lecture room\n- how to go to A206\n- where is my class\n- where is the student service\n- where is the atm\n- how to go to the bus stop\n- direct me\n- how do I get to the library\n- where can I find the cafeteria\n- how do I reach the gym\n- where is the nearest restroom\n- how to get to the parking lot\n- where can I find the nearest elevator\n- how to reach the faculty office\n- where is the main entrance\n",
    },
    {
      intent: "ask_timetable",
      examples:
        "- what is my timetable\n- can I know my timetable?\n- how do I access my timetable?\n- could you provide me with my course schedule?\n- I'm looking for information on my timetable\n- where can I check my class timings?\n- how can I view my schedule for the week?\n- can you help me locate my timetable?\n- I need to know my timetable for this semester\n",
    },
    {
      intent: "ask_fee",
      examples:
        "- what is my fee\n- how is my fee\n- where is my fee\n- what is my outstanding fee\n- can I know my tuition fee?\n- how much do I owe in fees?\n- where can I check my tuition balance?\n- what is the status of my fee payment?\n- could you provide me with information about my outstanding fees?\n- I'm curious about my current tuition fee status\n- where can I find details about my semester fees?\n- can you help me understand my financial obligations to the university?\n- I need information about my fees for this semester\n",
    },
    {
      intent: "ask_career_path",
      examples:
        "- Could you suggest me a career path?\n- What is my career path for my course?\n- What is my career path?\n- Can you provide guidance on career options related to my field of study?\n- I'm interested in exploring potential career paths. Where should I start?\n- How can I plan my career after completing my course?\n- Can you recommend career paths based on my academic background?\n- What are the typical career trajectories for students in my program?\n- I'm unsure about my career direction. Can you offer some advice?\n- What job opportunities can I expect after graduation in my field?\n",
    },
    {
      intent: "ask_student_id",
      examples:
        "- What is my student ID?\n- How can I find out my student ID?\n- Can you provide me with my student ID?\n- Where can I locate my student ID?\n- I need to know my student identification number.\n- How do I access my student ID?\n- Could you help me retrieve my student ID?\n- What is the process for obtaining my student ID?\n- Can you assist me in locating my student identification?\n- I'm looking for information on my student ID. Can you help?\n",
    },
    {
      intent: "ask_name",
      examples:
        "- What is my name?\n- Do you know my name?\n- How can I get my name?\n- Can you provide me with my name?\n- Tell me my name\n- I forgot my name, can you remind me?\n- I need to know my name\n- My name, can you tell me?\n- Could you please tell me my name?\n- Please provide me with my name\n- What name do you have on record for me?\n- I'm curious, what's my name?\n- I'm trying to remember, what's my name again?\n- Can you confirm my name?\n- Is my name in your system?\n- How do I find out my name?\n- I need to find out my name\n- Where can I find my name?\n- My name, do you have it?\n- Can you help me find my name?\n- What do you know about my name?\n- Am I registered under a name?\n- Am I using my correct name?\n- Is my name on file?\n- I need to check my name\n- What's the name you have for me?\n- How do I access my name?\n- Can you assist me with my name?\n",
    },
    {
      intent: "ask_course",
      examples:
        "- what is my course?\n- can you provide me with my course?\n- what course am I currently studying?\n- what course am I taking?\n- what course am I studying?\n- tell me about my course\n- which course am I enrolled in?\n- can you remind me of my course?\n- please tell me my course\n- I forgot, what course am I in?\n- could you inform me about my course?\n",
    },
    {
      intent: "ask_enrollments",
      examples:
        "- what modules am I taking?\n- what is my enrollment status?\n- what are my enrolled modules?\n- can you list the modules I am taking?\n- which modules have I enrolled in?\n- provide me with details of my enrollments\n- show me my current module enrollments\n- give me information about my enrolled modules\n- please inform me about my module enrollments\n- could you tell me the modules I have enrolled in?\n",
    },
    {
      intent: "get_career_path",
      examples:
        "- Could you suggest me a career path for [business admin](course)?\n- Can you suggest a career path for [finance and economic](course)?\n- What is the career path for [art](course)?\n- Can you provide guidance on career options related to [bioscience](course)?\n- I'm interested in exploring career paths for [computer science](course). Can you help?\n- What are the potential career trajectories for [engineering](course) graduates?\n- Can you recommend career paths for [psychology](course) majors?\n- I'm curious about the career opportunities for [nursing](course) students. Can you provide information?\n- What career paths are available for [finance](course) professionals?\n- How can I plan my career after completing [marketing](course) studies?\n- Can you provide insights into career paths for [architecture](course) students?\n",
    },
    {
      intent: "ask_campus_direction",
      examples:
        "- how to get to sim?\n- how to get to sim ge?\n- how to get to sim university?\n- how to go to school?\n- how to go to university?\n- how to go to the campus?\n- How do I get to the school?\n- What's the best way to reach the campus?\n- Can you provide directions to the campus?\n- I'm not sure how to get to the university. Can you help?\n- Could you guide me on reaching the campus?\n- I need directions to the school campus. Can you assist?\n- What's the nearest transportation option to the campus?\n- How far is the university from here?\n- Can you give me directions to the university campus?\n- What's the easiest way to reach the school?\n- Can you give me directions to the campus from the nearest subway station?\n- Are there any specific instructions for reaching the campus from the highway?\n",
    },
    {
      intent: "ask_where_is_campus",
      examples:
        "- where is the school?\n- where is the campus?\n- Where is the campus located?\n- I'm not familiar with the area. Can you tell me where the campus is?\n- Could you provide information on the location of the university campus?\n- Can you tell me the address of the school campus?\n",
    },
  ],
  rules: [
    {
      rule: "greeting path",
      steps: [
        {
          intent: "greet",
        },
        {
          action: "utter_greet",
        },
      ],
    },
    {
      rule: "thank you path",
      steps: [
        {
          intent: "thank",
        },
        {
          action: "utter_welcome",
        },
      ],
    },
    {
      rule: "Say goodbye anytime the user says goodbye",
      steps: [
        {
          intent: "goodbye",
        },
        {
          action: "utter_goodbye",
        },
      ],
    },
    {
      rule: "Say 'I am a bot' anytime the user challenges",
      steps: [
        {
          intent: "bot_challenge",
        },
        {
          action: "utter_iamabot",
        },
      ],
    },
    {
      rule: "ask for services path",
      steps: [
        {
          intent: "ask_services",
        },
        {
          action: "utter_services_included",
        },
      ],
    },
    {
      rule: "Handle unknow user inputs",
      steps: [
        {
          intent: "nlu_fallback",
        },
        {
          action: "action_default_fallback",
        },
      ],
    },
    {
      rule: "pass to google",
      steps: [
        {
          intent: "ask_google",
        },
        {
          action: "action_default_fallback",
        },
      ],
    },
    {
      rule: " give direction",
      steps: [
        {
          intent: "ask_direction",
        },
        {
          action: "action_map_direction",
        },
      ],
    },
    {
      rule: "give campus direction",
      steps: [
        {
          intent: "ask_campus_direction",
        },
        {
          action: "action_campus_direction",
        },
      ],
    },
    {
      rule: "give campus location",
      steps: [
        {
          intent: "ask_where_is_campus",
        },
        {
          action: "utter_campus_located",
        },
      ],
    },
    {
      rule: "give timetable",
      steps: [
        {
          intent: "ask_timetable",
        },
        {
          action: "action_get_timetable",
        },
      ],
    },
    {
      rule: "give fee",
      steps: [
        {
          intent: "ask_fee",
        },
        {
          action: "action_get_fee",
        },
      ],
    },
    {
      rule: "give course",
      steps: [
        {
          intent: "ask_course",
        },
        {
          action: "action_get_course",
        },
      ],
    },
    {
      rule: "give enrollments",
      steps: [
        {
          intent: "ask_enrollments",
        },
        {
          action: "action_get_enrollments",
        },
      ],
    },
    {
      rule: "give career path",
      steps: [
        {
          intent: "ask_career_path",
        },
        {
          action: "action_get_career_path",
        },
      ],
    },
    {
      rule: "give specific career path",
      steps: [
        {
          intent: "get_career_path",
        },
        {
          action: "action_get_career_path",
        },
      ],
    },
    {
      rule: "give student id",
      steps: [
        {
          intent: "ask_student_id",
        },
        {
          action: "action_get_student_id",
        },
      ],
    },
    {
      rule: "give name",
      steps: [
        {
          intent: "ask_name",
        },
        {
          action: "action_get_name",
        },
      ],
    },
  ],
  stories: [
    {
      story: "get knowledges path affirm",
      steps: [
        {
          intent: "get_knowledges",
        },
        {
          action: "action_get_knowledges",
        },
        {
          action: "utter_did_that_help",
        },
        {
          intent: "affirm",
        },
        {
          action: "utter_glad",
        },
      ],
    },
    {
      story: "get knowledges path deny create ticket",
      steps: [
        {
          intent: "get_knowledges",
        },
        {
          action: "action_get_knowledges",
        },
        {
          action: "utter_did_that_help",
        },
        {
          intent: "deny",
        },
        {
          action: "utter_sorry",
        },
        {
          action: "utter_create_ticket",
        },
        {
          intent: "affirm",
        },
        {
          action: "ticket_form",
        },
        {
          active_loop: "ticket_form",
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_subject",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_subject: "Problem regarding enrollments",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_detail",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_detail: "I can't enroll in a course.",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: null,
            },
          ],
        },
        {
          active_loop: null,
        },
        {
          action: "utter_ticket_info",
        },
        {
          action: "utter_ticket_confirmation",
        },
        {
          intent: "affirm",
        },
        {
          action: "submit_ticket_form",
        },
      ],
    },
    {
      story: "get knowledges path deny create ticket deny submit",
      steps: [
        {
          intent: "get_knowledges",
        },
        {
          action: "action_get_knowledges",
        },
        {
          action: "utter_did_that_help",
        },
        {
          intent: "deny",
        },
        {
          action: "utter_sorry",
        },
        {
          action: "utter_create_ticket",
        },
        {
          intent: "affirm",
        },
        {
          action: "ticket_form",
        },
        {
          active_loop: "ticket_form",
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_subject",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_subject: "Problem regarding enrollments",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_detail",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_detail: "I can't enroll in a course.",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: null,
            },
          ],
        },
        {
          active_loop: null,
        },
        {
          action: "utter_ticket_info",
        },
        {
          action: "utter_ticket_confirmation",
        },
        {
          or: [
            {
              intent: "stop",
            },
            {
              intent: "deny",
            },
          ],
        },
        {
          action: "utter_ticket_cancel",
        },
        {
          action: "cancel_ticket_form",
        },
      ],
    },
    {
      story: "get knowledges path deny deny ticket",
      steps: [
        {
          intent: "get_knowledges",
        },
        {
          action: "action_get_knowledges",
        },
        {
          action: "utter_did_that_help",
        },
        {
          intent: "deny",
        },
        {
          action: "utter_sorry",
        },
        {
          action: "utter_create_ticket",
        },
        {
          intent: "deny",
        },
        {
          action: "utter_sorry",
        },
      ],
    },
    {
      story: "create ticket submit",
      steps: [
        {
          intent: "create_ticket",
        },
        {
          action: "ticket_form",
        },
        {
          active_loop: "ticket_form",
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_subject",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_subject: "Problem regarding enrollments",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_detail",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_detail: "I can't enroll in a course.",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: null,
            },
          ],
        },
        {
          active_loop: null,
        },
        {
          action: "utter_ticket_info",
        },
        {
          action: "utter_ticket_confirmation",
        },
        {
          intent: "affirm",
        },
        {
          action: "submit_ticket_form",
        },
      ],
    },
    {
      story: "create ticket no submit",
      steps: [
        {
          intent: "create_ticket",
        },
        {
          action: "ticket_form",
        },
        {
          active_loop: "ticket_form",
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_subject",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_subject: "Problem regarding enrollments",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: "ticket_detail",
            },
          ],
        },
        {
          slot_was_set: [
            {
              ticket_detail: "I can't enroll in a course.",
            },
          ],
        },
        {
          slot_was_set: [
            {
              requested_slot: null,
            },
          ],
        },
        {
          active_loop: null,
        },
        {
          action: "utter_ticket_info",
        },
        {
          action: "utter_ticket_confirmation",
        },
        {
          or: [
            {
              intent: "stop",
            },
            {
              intent: "deny",
            },
          ],
        },
        {
          action: "utter_ticket_cancel",
        },
        {
          action: "cancel_ticket_form",
        },
      ],
    },
  ],
};
