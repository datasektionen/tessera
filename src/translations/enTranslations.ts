import gbFaq from "../assets/faq/gb_faq.json";

const enTranslations = {
  main_page: {
    not_a_pain: "Ticket releases shouldn't be a pain!",
    welcome: "{{name}}, Welcome to",
    learn_how_button: "Learn how",
    page_description: {
      what_title: "What is Tessera?",
      what: "Tessera is a platform that makes ticket releases easy. Purchasing \
        tickets should not be a pain. Tessera makes it easy to create ticket\
        releases and manage them. Event organizers can easily view your food\
        preferences, allergies, and more in order to make your experience as\
        enjoyable as possible, with no hassle. Your account is automatically\
        tied to your tickets, so no need to fill in google forms or anything\
        like that.",
      how_title: "How does it work?",
      how: "In order to create a ticket release for your event, you must first become an event organizer, by creating a team. Currently, teams are created by contacting us at. Once you have created a team, you can start creating and managing ticket releases. You can invite other members to your team so that they can help you manage ticket releases. \nAs a user, you can view public events in the events tab. Tessera does not work as other ticketing platforms, where you have to pay for a ticket directly. Tessera provides different ways of distributing tickets, such as a lottery system, or a first-come-first-serve system. As such, a user does not buy a ticket, but instead requests a ticket. When the ticket releases closes, the selected allocation method is used to distribute tickets to users. \nIf you have any questions, feel free to contact us at.",
    },
  },
  tooltips: {
    add_ticket_type: "Add ticket batch  ",
  },
  form: {
    event_details: {
      name: "Name",
      name_helperText: "What is the name of your event?",
      description: "Description",
      description_helperText:
        "Describe what your event is about? What should people expect?",
      date: "Date",
      date_helperText: "When is your event?",
      location: "Location",
      location_helperText: "Where is your event?",
      team: "Team",
      team_helperText:
        "Which team is hosting your event? You need to tie the event to a team. If your not a part of a team, you can create one",
      private_event: "Private event",
      private_event_helperText:
        "Is your event private? If so, only people with the link can see it.",
    },
    ticket_release: {
      name: "Name",
      name_helperText: "What is the name of your ticket release?",
      description: "Description",
      description_helperText:
        "Describe what types of tickets you are releasing. What should people expect?",
      available_at: "Available at",
      available_at_helperText:
        "When will the tickets be released? This is the time when users can start requesting tickets.",
      closes_at: "Closes at",
      closes_at_helperText:
        "Wheen will the ticket release close? This is the tim when users can no longer request tickets.",
      ticket_release_method: "Ticket release method",
      ticket_release_method_helperText:
        "How do you want to distribute tickets?",
      lottery_duration: "Lottery duration (minutes)",
      lottery_duration_helperText:
        "For First Come First Serve, the lottery duration defines within how many minutes, requested tickets will be entered into a lottery. If more tickets are requested than available, all participants that request tickets within this timeframe will be entered into a lottery, the rest will be reserves.",
      max_tickets_per_user: "Max tickets per user",
      max_tickets_per_user_helperText: "How many tickets can a user request?",
      ticket_quantity: "Ticket quantity",
      ticket_quantity_helperText: "How many tickets will be available?",
      notification_method: "Notification method",
      notification_method_helperText:
        "How do you want to notify users about the ticket release?",
      cancellation_policy: "Cancellation policy",
      cancellation_policy_helperText: "What is your cancellation policy?",
      reserved_ticket_release: "Reserved ticket release",
      reserved_ticket_release_helperText:
        "A reserved ticket release contains tickets that are reserved for specific users. A promo code is required to access this ticket. Remember that you can add more ticket releases later.",
      promo_code: "Promo code",
      promo_code_helperText:
        "What promo code should be used to access this reserved ticket release?",
    },
    ticket_types: {
      name: "Name",
      name_helperText: "What is the name of this ticket?",
      description: "Description",
      description_helperText: "Describe whats included in this ticket",
      price: "Price (SEK)",
      price_helperText: "How much does this ticket cost?",
    },

    button_clear: "Clear",
    button_next: "Next",
    button_create: "Create",
    button_back: "Back",
    button_restart: "Restart",
    button_confirm: "Confirm",
    button_cancel: "Cancel",
    button_create_event: "Create event",
    button_save: "Save",
    button_submit: "Submit",
    button_manage: "Manage",
  },
  create_event: {
    title: "Create event",
    create_event_description:
      "Create an event to manage ticket releases, attendees, and more. An event consists of several parts, but tessera aims to make it as easy as possible. We will walk you through the process step by step.",
    event_details_title: "Event details",
    event_details_description:
      "Let's start with the basics. What are the details of your event?",
    ticket_release_title: "Create ticket release",
    ticket_release_description:
      "Moving on to the ticket releases. Here you can specify when a batch of tickets will become available for people to request. You can also create more ticket releases later, in the edit event page.",
    ticket_release: "Ticket Release",
    ticket_release_helperText:
      "Let's define the details for this ticket release.",
    confirm_event_creation_restart_text:
      "Are you sure you want to restart event creation? All progress will be lost.",
    // Ticket types
    ticket_types_title: "Ticket Batches",
    ticket_types_description:
      "Next step... Ticket batches. Here you will define the different types of tickets that will be available for your event under the previous ticket release. Each ticket release can have multiple ticket batches. You can also create more ticket types later, in the edit event page. Keep in mind that the total amount of tickets defined in the previous step will be distributed among the ticket batches.",
    ticket_types: "Ticket Batches",
    ticket_types_helperText:
      "Let's define the different batches of tickets that will be available for the previous ticket release. Select a ticket batch to edit it.",
    finish_title: "Thats it!",
    finish_description:
      "You have now successfully filled out all the details for your event. Click the button below to create your event. You can also go back and edit your event by clicking the back button. But you can also edit your event later in the edit event page.",
  },
  // Profile
  profile: {
    title: "Profile",
    full_name: "Full name",
    email: "Email",
    username: "Username",
    role: "Role",
    teams: "Teams",

    links_and_buttons: {
      your_ticket_requests: "Your ticket requests",
      your_tickets: "Your tickets",
      your_teams: "Your teams",
    },

    food_preferences: {
      title: "Food preferences",
      allergies_and_dietary_restrictions:
        "Allergies and dietary restrictions (Select all that apply)",
      allergies_and_dietary_restrictions_helperText:
        "Select all that apply, leave blank if none apply.",
      additional_notes: "Aditional notes",
      additional_notes_helperText:
        "Provide any additional notes here regarding your food preferences. Leave blank if you have none.",
    },

    your_ticket_requests: {
      title: "Your ticket requests",
      description:
        "Here you can see all the ticket requests you have made. You can cancel a ticket request by clicking on the ticket request and clicking the cancel button. When the event organizer allocates tickets you will receive either a ticket or a reserve status. You can see all your tickets and reserve status <1>here</1>.",
      upcoming_events: "Upcoming events",
      no_upcoming_events: "You have no upcoming events.",
      past_events: "Past events",
      no_past_events: "You have no past events.",
    },

    your_tickets: {
      title: "Your tickets",
      description:
        "Here you can see all the tickets you have gotten. You can give up your ticket by clicking on the ticket and then choose the option 'I no longer wish to attend', which will give your ticket to the next person in line. If you have not yet been allocated a ticket or reserve ticket, you can see your ticket requests <1>here</1>.",
      upcoming_events: "Upcoming events",
      no_upcoming_events: "You have no upcoming events.",
      past_events: "Past events",
      no_past_events: "You have no past events.",
    },

    your_teams: {
      title: "Your teams",
      description:
        "Here you can see all the teams you are a part of. Click on a team to see more details. You can create a new team <1>here</1>.",
      not_part_of_any_teams:
        "You are not part of any teams. Read more about creating a team on the landing page.",
      add_user: "Add user",
      add_user_helperText:
        "Enter the username of the user you want to add to this team. You can change their role later. Hint: Username is the same as kth-id.",
      manage_team_events: "Manage team events",
      no_events:
        "There are no events in this team. Create one now <1>here</1>.",
      users: "Users",
      no_users: "There are no users in this team.",
    },
  },

  common: {
    show_all: "Show all",
    show_less: "Show less",
    search: "Search",
    created: "Created",
  },

  faq: {
    title: "Frequently Asked Questions",
    ...gbFaq,
  },
};

export default enTranslations;