import { title } from "process";
import gbFaq from "../assets/faq/gb_faq.json";

const enTranslations = {
  navigation: {
    events: "Events",
    create_event: "Create event",
    teams: "Teams",
    contact: "Contact",
    login: "Login",
  },

  main_page: {
    phrases: {
      "1": "Ticket releases shouldn't be a pain!",
      "2": "Ticket releases shouldn't be tricky!",
      "3": "Ticket releases shouldn't be a hassle!",
      "4": "Event management is now easy!",
      "5": "Event management is now simple!",
      "6": "Event management is now straightforward!",
    },
    not_a_pain: "Ticket releases shouldn't be a pain!",
    welcome: "{{name}}, Welcome to",
    learn_how_button: "Learn how",
    get_in_touch_button: "Get in touch",
    login_page: {
      secure_spot: "To secure your spot.",
      external_user: "External user with no KTH account?",
      for_business_inquiries:
        "For business-related inquiries, please contact <1>Lucas Dow</1>, the creator of Tessera.",
    },
    page_description: {
      what_title: "What is Tessera?",
      what: "Tessera is a platform that makes ticket releases easy. Purchasing \
        tickets should not be a pain. Tessera makes it easy to create ticket\
        releases and manage them. Event organizers can easily view your food\
        preferences, allergies, and more in order to make your experience as\
        enjoyable as possible, with no hassle. Your account is automatically\
        tied to your tickets, so no need to fill in Google Forms or anything\
        like that.",
      in_beta_title: "Tessera BETA",
      in_beta:
        "Tessera is currently in BETA. This means that Tessera is still\
        being developed and improved. If you or your organization are interested\
        in using Tessera BETA, we will set up a team for you free of charge. This way, you can create\
        events and manage ticket releases. At the same time you can provide feedback\
        and help us improve Tessera. Get in touch to get started!",
      how_title: "How does it work?",
      how: "In order to create a ticket release for your event, you must first become an event organizer, by creating a team. Currently, teams are created by contacting us at. Once you have created a team, you can start creating and managing ticket releases. You can invite other members to your team so that they can help you manage ticket releases. \nAs a user, you can view public events in the events tab. Tessera does not work as other ticketing platforms, where you have to pay for a ticket directly. Tessera provides different ways of distributing tickets, such as a lottery system, or a first-come-first-serve system. As such, a user does not buy a ticket, but instead requests a ticket. When the ticket release closes, the selected allocation method is used to distribute tickets to users. \nIf you have any questions, feel free to contact us at.",
    },
    get_in_touch: {
      quote1:
        "I'm very proud of Tessera because it's the first time that I've developed software that is being used by a large number of people.",
      quote2:
        "If your organization or team is looking for an easy-to-use event and ticket management system, please contact me.",
    },
    how_to_use: {
      request_ticket_title: "Request a ticket",
      request_ticket:
        "Tessera's innovative approach to ticket distribution allows users to request tickets to events through methods like a lottery system or first-come-first-serve, making the process fairer and more accessible; simply navigate to the events tab, find your event, and click 'Request' to start.",
      fill_out_title: "Fill Out Personal Details",

      fill_out:
        "After requesting a ticket, you'll need to provide personal details like food preferences and allergies. This information helps organizers tailor the event to your needs, ensuring a personalized experience. Tessera links your account to your tickets, streamlining the process and enhancing your enjoyment of the event.",
      wait_title: "Wait for Ticket Allocation",
      wait: "The final step involves waiting for the ticket release to close and for tickets to be allocated, either by lottery or on a first-come-first-served basis. Tessera ensures fair ticket distribution, so monitor your email or Tessera account for updates on your request status. If successful, you'll receive further instructions, including any necessary payment details.",
    },
  },
  tooltips: {
    add_ticket_type: "Add ticket batch",
    manage_ticket_releases: "Manage ticket releases for this event.",
    manage_tickets:
      "The table shows all the ticket requests and tickets for this event.",
    manage_tickets_custom_event_form_description:
      "Here you can see all the form responses for this event. This is the information the user has submitted when requesting a ticket.",
    must_be_edited: "This form must be valid before you can proceed.",
  },
  form: {
    required_description: "Fields marked with * are required",
    event_details: {
      name: "Name",
      name_helperText: "What is the name of your event?",
      description: "Description",
      description_helperText:
        "Describe what your event is about. What should people expect? Markdown is supported.",
      date: "Date",
      date_helperText: "When is your event?",
      end_date: "End date",
      end_date_helperText: "When does your event end?",
      location: "Location",
      location_helperText: "Where is your event?",
      team: "Team",
      team_helperText:
        "Which team is hosting your event? You need to tie the event to a team. If you're not a part of a team, you can create one",
      private_event: "Private event",
      private_event_helperText:
        "Is your event private? If so, only people with the link can see it.",
    },
    ticket_release: {
      name: "Name",
      name_helperText: "What is the name of your ticket release?",
      description: "Description",
      description_helperText:
        "Describe what types of tickets you are releasing. What should people expect? Markdown is supported.",
      available_at: "Available at",
      available_at_helperText:
        "When will the tickets be released? This is the time when users can start requesting tickets.",
      closes_at: "Closes at",
      closes_at_helperText:
        "When will the ticket release close? This is the time when users can no longer request tickets.",
      ticket_release_method: "Ticket release method",
      ticket_release_method_helperText:
        "How do you want to distribute tickets?",
      lottery_duration: "Lottery duration (minutes)",
      lottery_duration_helperText:
        "For First Come First Serve, the lottery duration defines within how many minutes, requested tickets will be entered into a lottery. If more tickets are requested than available, all participants that request tickets within this time frame will be entered into a lottery, the rest will be reserves.",
      max_tickets_per_user: "Max tickets per user",
      max_tickets_per_user_helperText:
        "How many tickets can a user request? Always 1 currently.",
      tickets_available: "Ticket quantity",
      tickets_available_helperText: "How many tickets will be available?",
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
      allow_external: "Allow external users",
      allow_external_helperText:
        "Allow external users to request tickets for this ticket release.",
      selective_description: "Describe the allocation method",
      selective_description_helperText:
        "Specify how your team plans to allocate tickets. This information will be shown to the user when they request a ticket.",
    },
    ticket_types: {
      name: "Name",
      name_helperText: "What is the name of this ticket?",
      description: "Description",
      description_helperText:
        "Describe what's included in this ticket. Markdown is supported.",
      price: "Price (SEK)",
      price_helperText: "How much does this ticket cost?",
    },
    contact: {
      title: "Contact",
      email: "Your Email",
      email_helperText: "What is the contact email for this ticket?",
      subject: "Subject",
      subject_helperText: "What is the subject for this ticket?",
      name: "Name",
      name_helperText: "What is the name of the contact person?",
      message: "Message",
      message_helperText: "What is the message for this ticket?",
      success: "Your message has been sent!",
      fail: "Your message could not be sent. Please try again later.",
      description:
        "If you have any questions, problems or suggestions, feel free to contact us. We will get back to you as soon as possible.",
      team_name: "Team",
      team_helperText: "Which team are you contacting?",
    },

    event_fields: {
      title: "Custom Event Fields",
      subtitle:
        "Here you can add and edit custom fields for your event. These fields will be shown to the user when they request a ticket.",
      label_name: "Name",
      label_description: "Description",
      label_type: "Type",
      label_required: "Required",
      form_field_description: "Description",
      form_field_description_helperText:
        "Describe what additional information you want to collect from the user, and why. Markdown is supported.",
      delete_field_confirm:
        "Are you sure you want to delete this field? Deleting this field might result in loss of response data. You will have to save after deleting!",
    },

    addon: {
      name: "Name",
      name_helperText: "What is the name of this addon?",
      description: "Description",
      description_helperText:
        "Describe what this addon is about. Markdown is supported.",
      price: "Price (SEK)",
      price_helperText: "How much does this addon cost?",
      max_quantity: "Max quantity",
      max_quantity_helperText: "How many of this addon can a user buy?",
      is_enabled: "Enabled",
      is_enabled_helperText: "Is this addon enabled?",
      contains_alcohol: "Contains alcohol",
      contains_alcohol_helperText: "Does this addon involve alcohol?",
    },

    banking_details: {
      bank_name: "Bank Name",
      bank_name_helperText: "Enter the name of the bank",
      account_holder: "Account Holder",
      account_holder_helperText: "Enter the name of the account holder",
      clearing_number: "Clearing Number",
      clearing_number_helperText: "Enter the clearing number (ex. 1234)",
      account_number: "Account Number",
      account_number_helperText: "Enter the account number (ex. 1234567890)",
      button_save: "Save",
      updated_at: "Last updated {{date}}",
    },

    button_sign_in: "Sign in",
    button_add_field: "Add field",
    button_clear: "Clear",
    button_next: "Next",
    button_edit: "Edit",
    button_create: "Create",
    button_back: "Back",
    button_restart: "Restart",
    button_confirm: "Confirm",
    button_cancel: "Cancel",
    button_create_event: "Create event",
    button_save: "Save",
    button_submit: "Submit",
    button_manage: "Manage",
    button_details: "Details",
    button_request: "Request",
    button_delete: "Delete",
    button_send: "Send",
    button_check_in: "Check in",
    button_update_gdpr: "Save and renew consent",
    button_send_out: "Send out",
    button_economy: "Economy",
    generate_sales_report: "Generate sales report",
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
    finish_title: "That's it!",
    finish_description:
      "You have now successfully filled out all the details for your event. Click the button below to create your event. You can also go back and edit your event by clicking the back button. But you can also edit your event later in the edit event page.",
    no_teams:
      "You are currently not part of any team, and therefore cannot create an event. In order to create a team you need to contact us. Read more on the landing page.",
  },
  // Profile
  profile: {
    title: "Profile",
    full_name: "Full name",
    internal_email: "KTH Email",
    external_email: "Email",
    preferred_email: "Preferred email",
    edit_preferred_email: "Edit preferred email",
    edit_preferred_email_description:
      "Here you can edit your preferred email. This is the email you will receive all notifications at.",
    username: "Username",
    role: "Role",
    teams: "Teams",

    links_and_buttons: {
      your_ticket_requests: "My ticket requests",
      your_tickets: "My tickets",
      your_teams: "My teams",
    },

    food_preferences: {
      title: "Food preferences",
      allergies_and_dietary_restrictions:
        "Allergies and dietary restrictions (Select all that apply)",
      allergies_and_dietary_restrictions_helperText:
        "Select all that apply, leave blank if none apply.",
      additional_notes: "Additional notes",
      additional_notes_helperText:
        "Provide any additional notes here regarding your food preferences. Leave blank if you have none.",
      privacy_policy_title: "Privacy policy",
      gdpr_agree_helperText:
        "I agree to the processing of my personal data for the purpose of managing my food preferences according to the <1>Food Preferences Privacy Policy</1>",
    },

    your_ticket_requests: {
      title: "My ticket requests",
      description:
        "Here you can see all the ticket requests you have made. You can cancel a ticket request by selecting it and clicking the cancel button. When the event organizer allocates tickets you will receive either a ticket or a reserve status. You can see all your tickets and reserve statuses <1>here</1>.",
      upcoming_events: "Upcoming events",
      no_upcoming_events: "You have no upcoming events.",
      past_events: "Past events",
      no_past_events: "You have no past events.",
      no_ticket_requests: "You have no ticket requests.",
    },

    your_tickets: {
      title: "My tickets",
      description:
        "Here you can see all the tickets you have gotten. You can give up your ticket by clicking on it and then choosing the option 'I no longer wish to attend', which will give your ticket to the next person in line. If you have not yet been allocated a ticket or reserve ticket, you can see your ticket requests <1>here</1>.",
      upcoming_events: "Upcoming events",
      no_upcoming_events: "You have no upcoming events.",
      past_events: "Past events",
      no_past_events: "You have no past events.",
      no_tickets: "You have no tickets.",
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
      delete_team: "Delete team",
      team_name_title: "Team name",
      edit_team: "Edit team",
      delete_team_confirmation_title: "Confirm team deletion",
      delete_team_confirmation:
        "Are you sure you want to delete this team? This action cannot be undone.",
    },
  },

  create_team: {
    title: "Create team",
    what_is_a_team: "What is a team?",

    description:
      "Here you can create a team. Teams are used to organize events and manage users. It allows the managers of the team to create events, manage ticket sales and plan the event more efficiently. You can invite other users to join your team and give them different permissions. You are also not limited to one team, you can create as many as you want, and join as many as you want. You can also leave teams at any time. Without being a part of a team you cannot create events.",
    teams_created_by_contacting_us:
      "Currently, teams are created by contacting us. We are working on a solution to allow users to create teams themselves.",
    your_teams_text: "Your teams",
    add_team_title: "Team Name",
    add_team_helperText:
      "This will be the name of your team. You will automatically be the owner of this team.",
    create_team_button: "Create team",
    add_team_email: "Team email",
    add_team_email_helperText:
      "This will be the email of your team. This is used to contact the team.",
  },

  manage_event: {
    title: "Manage {{event_name}}",
    delete_button: "Delete {{event_name}}",
    manage_ticket_releases: "Manage ticket releases",
    ticket_release_method_title: "Ticket release method",
    ticket_release_ticket_info_title: "Tickets info",
    ticket_requests: "Ticket requests",
    lottery_entered_ticket_requests: "Lottery entered ticket requests",
    not_lottery_entered_ticket_requests: "Requested after lottery window",
    paid_tickets: "Paid tickets",
    not_yet_paid_tickets: "Not yet paid tickets",
    refunded_tickets: "Refunded tickets",
    reserve_tickets: "Reserve tickets",
    ticket_release_actions_title: "Ticket release actions",
    closed: "has closed",
    open: "is open",
    allocate_tickets_button: "Allocate tickets",
    the_ticket_release: "The ticket release",
    deleted_ticket_requests: "Deleted ticket requests",
    deleted_tickets: "Deleted tickets",
    not_open: "Not open",
    not_yet_open: "Not yet open",
    check_allocated_reserve_tickets: "Try to allocate reserve tickets",
    check_allocated_reserve_tickets_tooltip:
      "Pressing this button will manually try to allocate reserve tickets. This is useful if you don't want to wait for the automatic allocation.",
    allocated_tickets: "Allocated tickets",
    pay_within_hours: "Users must pay within (hours)*",
    edit_payment_deadline: "Edit payment deadline",
    payment_deadline: "Payment deadline",
    payment_deadline_description:
      "Here you can specify the payment deadline for your event. Note that this will not affect tickets that have already been allocated, i.e tickets that already has a payment deadline, this will only affect tickets that are allocated after this change.",
    payment_deadline_not_editable:
      "Payment deadline is not editable for this ticket release. The payment deadline is set when you allocate the tickets.",
    payment_deadline_helperText:
      "When is the payment deadline for users who initially got a ticket?",
    reserve_payment_duration: "Reserve payment duration",
    reserve_payment_duration_helperText:
      "When a reserve recieves a ticket, how long do they have to pay for it before it is given to the next person in line?",
    reserve_payment_duration_text:
      "Allocated reserve tickets will have a default payment deadline of {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, and {{ seconds }} seconds.",
    allocate_tickets_confirm_title: "Confirm ticket allocation",
    allocate_tickets_warning:
      "This ticket release is currently open. Allocating tickets now will automatically close the ticket release. Are you sure you want to allocate tickets now?",
    allocate_tickets_confirm:
      "Are you sure you want to close this ticket release?",
    manage_tickets: "Manage tickets",
    tickets_available: "Total Tickets available",
    allocate_tickets_helperText:
      "How long do users have to pay for their tickets before it is given to the next person in line?",
    delete_event_title: "Confirm event deletion",
    delete_event_confirmation:
      "Are you sure you want to delete this event? This action cannot be undone.",
    delete_event_confirmation_enter_text: "Type 'delete' to confirm deletion",
    delete_ticket_release_confirmation:
      "Are you sure you want to delete this ticket release? This action cannot be undone.",
    manage_tickets_custom_event_form: "Form Responses",
    add_ticket_release: "Add ticket release",
    ticket_release_time_title: "Ticket release open and close",

    breadcrumbs: {
      manage: "Manage",
      edit: "Edit",
      ticket_releases: "Ticket releases",
      event: "Event",
      addons: "Addons",
      ticket_types: "Ticket batches",
      form: "Form",
      send_outs: "Send outs",
      tickets: "Tickets",
    },

    overview: {
      title: "Overview",
      site_visits: "Site visits",
      unique_visitors: "Unique visitors",
      num_ticket_requests: "Ticket requests",
      total_income: "Income",
    },

    ticket_releases: {
      title: "Manage ticket releases",
    },

    settings: {
      financial: {
        title: "Financial settings",
        description:
          "Here you can manage the financial settings for your event. You can add your banking details, and view the financial status of your event.",
      },
    },

    drawer: {
      settings: {
        title: "Settings",
        financial: "Financial",
        emails: "Emails",
        domains: "Domains",
      },

      edit: {
        event: "Event",
        ticket_releases: "Ticket releases",
        ticket_types: "Ticket batches",
        form: "Form",
        landing_page: "Landing page",
      },

      send_outs: {
        title: "Send outs",
        list: "List",
        new: "New",
      },

      manage: {
        title: "Overview",
        tickets: "Tickets",
        ticket_releases: "Ticket releases",
        check_in: "Check in",
        form_responses: "Form responses",
      },

      economy: {
        title: "Economy",
        pay_outs: "Pay outs",
      },
    },

    tickets: {
      title: "Manage tickets",

      user: {
        info: "User info",
        food_preferences: "Food preferences",
        full_name: "Full name",
        username: "Username",
        id: "ID",
        email: "Email",
        is_external: "External user",
      },

      ticket_info: {
        id: "ID",
        title: "Ticket info",
        ticket_batch: "Ticket batch",
        ticket_release: "Ticket release",
        requested_at: "Requested at",
        is_paid: "Is paid",
        allocated: "Allocated",
        purchasable_at: "Purchasable at",
        payment_deadline: "Payment deadline",
        entered_into_lottery: "Entered into lottery",
        is_reserve: "Is reserve",
        paid_at: "Paid at",
        checked_in: "Checked in",
        deleted_at: "Deleted at",
        ticket_type: "Ticket type",

        ticket_types: {
          ticket: "Ticket",
          ticket_request: "Ticket request",
        },

        add_ons: {
          title: "Addons",
          name: "Name",
          price: "Price",
          quantity: "Quantity",
          contains_alcohol: "Contains alcohol",
        },

        edit: {
          title: "Edit ticket info",
          checked_in_helperText: "Has the user checked in?",
          payment_deadline_helperText:
            "The user will recieve an email with the updated payment deadline.",
        },
      },

      event_form: {
        title: "Form responses",
      },

      ticket_actions: {
        title: "Ticket actions",
        allocate: "Allocate",
      },

      payment_info: {
        title: "Payment info",
        currency: "Currency",
        amount: "Amount",
        refunded: "Refunded",
        refunded_at: "Refunded at",
        payment_method: "Payment method",
      },
    },

    economy: {
      title: "Event Economy",
      subtitle:
        "Here you can see the economy of your event. You can generate sales reports and see the total revenue of your event.",
      sales_reports: "Sales reports",
      total_sales: "Total sales",
      tickets_sold: "Tickets sold",
      created_at: "Created at",
      status: "Status",
      message: "Message",
      download: "Download",
      no_reports: "There are no sales reports for this event.",
    },

    private_event: {
      title: "This is a private event",
      subtitle:
        "This event is private. Share the link below with the people you want to invite to the event.",
    },
    send_out: {
      title: "Send Outs",
      new: "New Send Out",
      description:
        "Send out an email to all users that have requested a ticket for this event. You can use this to notify users about the ticket release, or to notify users that have been allocated a ticket.",
      preview: "Preview",
      subject: "Subject",
      subject_helperText: "What is the subject of the email?",
      message: "Message",
      message_helperText:
        "What are the contents of the email? Markdown is supported.",
      preview_helperText: "This is how the email will look to the users.",
      ticket_releases: "Select ticket releases",
      ticket_releases_helperText:
        "The users of the selected ticket releases will receive the email.",
      filter_tickets: "Filter tickets",
      filter_tickets_helperText:
        "Filter tickets based on their status. You can select multiple statuses.",
      num_users: "The email will be sent to {{numUsers}} users.",

      recipients: "Recipients",
      status_message: "Status message",
      no_send_outs: "There are no send outs for this event.",
    },
    edit: {
      title: "Edit event",
      subtitle: "Edit all of your event details here.",
      event_details: {
        title: "Edit event details",
      },
      ticket_releases: {
        title: "Edit Ticket Release",
        edit_name: "Edit {{name}}",
        subtitle:
          "Create ticket releases for your event. You can create as many as you want, and you can edit them later.",
        select: "Select a ticket release to edit it.",
        add: "Add ticket release",
        add_subtitle:
          "Let's add another ticket release. First we need to define the details for this ticket release.",
        closed: "Closed",
        no_ticket_releases: "There are no ticket releases for this event.",
        edit_ticket_types: "Edit tickets",
        add_helperText: "Please select a ticket release to edit.",

        edit_addons: "Edit Ticket Addons",
      },

      addons: {
        title: "Edit Ticket Addons",
        subtitle:
          "Add addons to the ticket release. You can create as many as you want. Try to be specific with the name and description of the addon. You can also specify if the addon costs extra.",
        form_title: "Addon Form",
        form_subtitle:
          "Define your addons here. You can add as many as you want.",
        confirm_delete_title: "Confirm addon deletion",
        confirm_delete_text:
          "Are you sure you want to delete this addon? This action cannot be undone.",
      },

      ticket_types: {
        title: "Edit Ticket Batches",
        ticket_details: "Ticket details",
        ticket_details_helperText:
          "Modify the details of your ticket types and then click 'Save'.",
      },
    },

    form_field_responses: {
      list_view: "List View",
      table_view: "Table View",
    },
  },

  ticket_release_method: {
    first_come_first_served_title: "First come first served",
    first_come_first_served_description:
      "First Come First Serve Lottery is a ticket release method where people who request a ticket within a specified time frame are entered into a lottery. When tickets are allocated, all ticket requests within this time frame are entered into a lottery and winners are selected randomly. Winners receive a ticket and the rest are placed on the waitlist. Anyone requesting a ticket after the specified time frame is placed on the waitlist, unless the lottery is not full. If the lottery is not full, remaining tickets are distributed to those on the waitlist in the order they requested the ticket.",
  },

  ticket_request: {
    cost_overview: "Cost overview",
    cancel_ticket_request_button: "Cancel ticket request",
    go_to_tickets_button: "Go to tickets",
    cancel_ticket_request_confirm_title: "Confirm ticket request cancellation",
    handled: "Ticket Request converted to ticket",
    deleted: "Ticket Request has been deleted",
    ticket_request: "Ticket Request",
    cancel_ticket_request_confirm:
      "Are you sure you want to cancel this ticket request? This action cannot be undone.",
  },

  event_form_fields: {
    title: "Event Form",
    description:
      "The event organizer has requested additional information from you. See information from the event organizer below.",
    accept_terms_and_conditions:
      "By submitting this form, you agree to share the above information with the event organizer in order to for them to plan the event. The information will be processed in accordance with the Chapter's information processing policy.",
    no_form_fields: "Oops! There is no form for this event.",
  },

  tickets: {
    cost_overview: "Cost overview",
    confirmed_ticket:
      "Your ticket has been confirmed! It's now time to pay for your ticket. You can pay for your ticket by clicking the button below. If you do not pay for your ticket before <1>{{payBefore}}</1>, your ticket will be given to the next person in line.",
    reserve_ticket:
      "Unfortunately, you were allocated a reserve ticket for this event. You will be notified if a ticket becomes available.",
    has_paid: "You have paid for your ticket!",

    cancel_ticket_request_button: "Cancel ticket request",
    cancel_ticket_button: "I no longer wish to attend",
    confirm_cancel_ticket_title: "Confirm ticket cancellation",
    confirm_cancel_ticket_request_title: "Confirm ticket request cancellation",
    leave_reserve_list_text: "Leave reserve list",
    reserve_number: "You are number <1>{{number}}</1> on the reserve list.",
    paid_ticket:
      "You have paid for your ticket! We are looking forward to seeing you at the event. Receipt will be sent to your email.",
    confirm_cancel_reserve_ticket_text:
      "Are you sure you want to cancel your ticket? You will not be able to get your ticket back and this action cannot be undone!",
    confirm_cancel_ticket_text:
      "Are you sure you want to cancel this ticket? You will not be able to get your ticket back and this action cannot be undone!",
    pay_button: "Pay now",
    not_paid_on_time:
      "Sorry! You did not pay for your ticket on time, so you lost your ticket.",

    payment: {
      title: "Confirm Your Ticket Purchase",
      pay_now: "Pay {{price}} SEK",
      description: "Here you can pay for your ticket.",
    },

    qr_code: {
      description:
        "This is your QR code. Please have it ready when you arrive at the event.",
      already_checked_in: "You have already checked in.",
    },
  },

  event: {
    list_title: "Events",
    tickets: "Tickets",
    reserved: "Reserved",
    ticket_releases: "Ticket releases",
    no_ticket_releases: "There are no ticket releases for this event.",
    event_by: "Event by",
    promo_code_title: "Promo code",
    promo_code_helperText: "Enter the promo code to access reserved tickets.",
    contact_organizers:
      "If you have any questions, you can contact <1>{{organization}}</1> <2>here</2>.",
    ticket_request_success_title: "Ticket request successful",
    ticket_request_success_description:
      "You can also fill out this information later if you want. You can do so <1>here</1>.",
    check_in: {
      scan_ticket_instructions: "Scan the QR code on the ticket to check in",
      loading: "Loading...",
    },
    ticket_release: {
      closed: "Ticket release has closed",
      tickets_available_in: "Tickets available in",
      tickets_available_for: "Ticket release closes in",
      method: "This release uses <1>{{method}}</1>",
      second: "second(s)",
      minute: "minute(s)",
      hour: "hour(s)",
      day: "day(s)",
      week: "week(s)",
      month: "month(s)",
      method_info: {
        fcfsl:
          "Requests made within the first <1>{{duration}}</1> minutes of the tickets release will be entered into the lottery.",
      },
      reserved: "Reserved",
      no_tickets: "There are no tickets available.",
      remove_reminder: "Remove reminder",
      set_reminder: "Set reminder for 10 minutes before ticket release",
      information_processing_policy_info:
        "By requesting a ticket you agree to share your food preferences and user details with the event organizer. Information collected will be processed in accordance with the Chapter's information processing policy, <1>Click Here</1> for more information.",
      checkout: {
        overview: "Overview",
        what_is_a_request_title: "What is a ticket request?",
        what_is_a_request:
          "When making a request, you are not guaranteed to get the tickets you want. The allocation of the tickets is done according to the Ticket Release Method, which is described in the release description.",
        total: "Total",
        ticket: "Ticket",
      },
      addons: {
        title: "Ticket Addons",
        description: "Here you can add addons to your ticket.",
        max_quantity: "Max quantity",
        contains_alcohol: "Contains alcohol",
        view_addons: "View ticket addons",
      },
      request_process: {
        complete_ticket_request: "Complete ticket request",
        account_required_description:
          "In order to request a ticket to this event, you must have an account. Please sign in or create an account.",
        already_have_an_account: "Already have an account?",
        form: {
          first_name: "First name",
          last_name: "Last name",
          email: "Email",
          phone_number: "Phone number (optional)",
          password: "Password",
          password_repeat: "Repeat password",
          button_save_account: "Save account",
          button_save_account_helperText:
            "We will save your details for future purchases",
          button_sign_up: "Sign up",
          button_sign_in: "Sign in",
          button_continue_as_guest: "Continue as guest",
        },
      },
    },
  },

  external: {
    login: "Login",
    signup: "Sign up",
    info: {
      subtitle: "External login and signup.",
      description:
        "If you're not a KTH student, you can still use Tessera. However, since you don't have a KTH account, you'll need to use a different login method. When using tessera, you will only be able to purchase tickets from ticket releases that are specific to external users. These may include '+1'-tickets, or honorary tickets for special guests.",
      forgot_password: "Forgot password?",
      dont_have_an_account: "Don't have an account? Sign up!",
      i_have_kth_account: "But I have a KTH account! Then <1>Click Here</1>",
    },
    form: {
      first_name: "First name",
      last_name: "Last name",
      username: "Username",
      email: "Email",
      password: "Password",
      password_repeat: "Repeat password",
      button_signup: "Sign up",
      button_login: "Login",
      no_account: "Don't have an account? Sign up!",
    },
  },

  footer: {
    about_title: "About",
    about_content:
      "Tessera is a platform that makes ticket releases and ticket management easy.",
    quick_links_title: "Quick links",
    home: "Home",
    events: "Events",
    profile: "Profile",
    report_an_issue_title: "Report an issue",
    made_by: "Tessera is built by <1>Lucas Dow</1>",
    report_an_issue_content:
      "If something isn't working, or you have a suggestion, You can <1>Create an issue on Github</1>.",
  },

  common: {
    show_all: "Show all",
    show_less: "Show less",
    show_more: "Show more",
    search: "Search",
    created: "Created",
    made_at: "Made at",
    updated: "Updated",
    private_event: "Private event",
    mobile_warning:
      "Welcome to Tessera! We see that you are using a mobile device. Some aspects of the website might not be optimized for mobile devices. However, requesting and viewing tickets should work as expected. If you're an event organizer, we recommend using a desktop device.",
  },

  faq: {
    title: "Frequently Asked Questions",
    ...gbFaq,
  },
};

export default enTranslations;
