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
    "nlu_fallbacka",
    "stop",
    "thank",
    "ask_joke",
    "feel_stressed",
  ],
  entities: ["knowledge"],
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
    utter_here_joke: [
      {
        text: "Here is a joke for you.",
      },
    ],
    utter_joke: [
      {
        text: "Why don't scientists trust atoms? Because they make up everything!",
      },
      {
        text: "I only know 25 letters of the alphabet. I don't know y.",
      },
      {
        text: "How do you organize a space party? You planet!",
      },
      {
        text: "What's a skeleton's least favorite room in the house? The living room!",
      },
      {
        text: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
      },
      {
        text: "Why don't seagulls fly over the bay? Because then they'd be bagels!",
      },
      {
        text: "What's orange and sounds like a parrot? A carrot!",
      },
      {
        text: "I told my wife she should embrace her mistakes. She gave me a hug.",
      },
      {
        text: "What do you call fake spaghetti? An impasta!",
      },
      {
        text: "How do you catch a squirrel? Climb a tree and act like a nut!",
      },
      {
        text: "Did you hear about the cheese factory explosion? There was nothing left but d- text:brie.",
      },
      {
        text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
      },
      {
        text: "What did the grape do when it got stepped on? Nothing, but it let out a little wine!",
      },
      {
        text: "I used to play piano by ear, but now I use my hands and fingers.",
      },
      {
        text: "How do you organize a fantastic space party? You planet!",
      },
      {
        text: "Why did the coffee file a police report? It got mugged.",
      },
      {
        text: "Why couldn't the bicycle stand up by itself? Because it was tw- text:tired!",
      },
      {
        text: "What did the janitor say when he jumped out of the closet? Supplies!",
      },
      {
        text: "I told my wife she should embrace her mistakes. She gave me a hug.",
      },
      {
        text: "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      },
    ],
    utter_overwhelmed: [
      {
        text: "I'm sorry to hear that you're feeling overwhelmed with tasks. It's a challenging situation, but you can take steps to manage it.",
      },
      {
        text: "Break down your tasks into smaller, more manageable steps. Tackling one thing at a time can make it less overwhelming.",
      },
      {
        text: "Prioritize your tasks based on urgency and importance. Focus on what needs to be done first.",
      },
      {
        text: "Consider asking for help or delegating tasks if possible. You don't have to do everything on your own.",
      },
      {
        text: "Take short breaks to clear your mind. Even a few minutes of deep breathing or stretching can make a difference.",
      },
      {
        text: "Create a to-do list to help you organize your tasks and track your progress.",
      },
      {
        text: "Set realistic expectations for yourself. It's okay if you can't do everything at once.",
      },
      {
        text: "Communicate with others about your workload. They may be able to offer support or adjust expectations.",
      },
      {
        text: "Practice self-compassion. Understand that it's okay not to be perfect, and everyone experiences overwhelm at times.",
      },
      {
        text: "Break your day into focused work sessions with short breaks in between to maintain productivity.",
      },
      {
        text: "Identify any unnecessary tasks that can be postponed or eliminated to lighten your load.",
      },
      {
        text: "Consider using productivity tools or apps to help you stay organized and on track.",
      },
      {
        text: "Celebrate small victories along the way. Recognizing your achievements, no matter how small, can boost your mood.",
      },
      {
        text: "Reach out to friends, family, or colleagues for encouragement and moral support.",
      },
      {
        text: "Take care of your physical well-being by getting enough sleep, eating nourishing meals, and staying hydrated.",
      },
      {
        text: "If the workload is consistently overwhelming, discuss it with your supervisor or manager to explore potential solutions.",
      },
      {
        text: "Practice mindfulness or meditation to help calm your mind and reduce stress.",
      },
      {
        text: "Focus on what you can control and let go of things beyond your control.",
      },
      {
        text: "Consider setting boundaries to protect your time and prevent additional tasks from piling up.",
      },
      {
        text: "Remember that it's okay to ask for help, whether it's from colleagues, friends, or professionals. Taking care of your mental health is crucial.",
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
      intent: "ask_joke",
      examples:
        "- Tell me a joke.\n- I need a joke.\n- I am sad, tell me a joke.\n- Joke?\n- I need joke.\n- Tell joke, please.\n- Can you share joke?\n- Want joke.\n- I like joke.\n- Joke, please!\n- I want to hear joke.\n- Please tell joke.\n- Give me joke.\n- Tell funny story.\n- Share funny joke.\n- Joke for me?\n- Can you joke?\n- I need funny joke.\n",
    },
    {
      intent: "feel_stressed",
      examples:
        "- Hi, I’m feeling stressed out\n- I'm stressed\n- Feeling overwhelmed\n- Stress is getting to me\n- Feeling anxious\n- I'm under a lot of pressure\n- It's all too much right now\n- Feeling tense\n- I'm really stressed\n- Feeling a bit frazzled\n- I'm getting worked up\n- Feeling strained\n",
    },
    {
      intent: "ask_services",
      examples:
        "- How can you help me?\n- What services do you offer?\n- What kind of stuff do you guys do?\n- Can you help me out with something?\n- I need some info about what you offer\n- Can you assist me with anything?\n- What exactly does this service cover?\n- Can you tell me what services you've got?\n- Could you help me with stuff from your service?\n- I need some help, what do you guys offer?\n- Just wondering, what's your service all about?\n- What's the deal with your service's offerings?\n",
    },
    {
      intent: "get_knowledges",
      examples:
        "- What are the [library hours](knowledge)?\n- How can I [access my grades](knowledge)?\n- Where can I find information about [student housing](knowledge)?\n- Tell me about the available [scholarships](knowledge).\n- Can you help with [course registration](knowledge)?\n- How do I contact the [career services office](knowledge)?\n- How can I get involved in [student clubs](knowledge)?\n- Any advice for [financial aid](knowledge)?\n- Can you guide me on [study abroad programs](knowledge)?\n- How to apply for [graduation](knowledge)?\n- What's the [housing application process](knowledge)?\n- Where can I find [career development resources](knowledge)?\n- How can I get [campus event updates](knowledge)?\n- Can you provide info about [internship opportunities](knowledge)?\n- How to join the [student government](knowledge)?\n- What are the available [language courses](knowledge)?\n- How to access [fitness centers](knowledge) on campus?\n- Tell me about the [public transportation options](knowledge).\n- Where can I find [faculty office hours](knowledge)\n- I want to know about [accommodation](knowledge)\n- Where is the [cafeteria](knowledge)\n- I need [tech support](knowledge)\n",
    },
    {
      intent: "create_ticket",
      examples:
        "- I want to create a ticket\n- I want to talk with the staff\n- I want to talk with a human\n- How can I talk to a staff\n- Help me write a ticket\n",
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
      rule: "ask for joke path",
      steps: [
        {
          intent: "ask_joke",
        },
        {
          action: "utter_here_joke",
        },
        {
          action: "utter_joke",
        },
      ],
    },
    {
      rule: "feeling stess path",
      steps: [
        {
          intent: "feel_stressed",
        },
        {
          action: "utter_overwhelmed",
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
