import gbFaq from "../assets/faq/gb_faq.json";

const enTranslations = {
  navigation: {
    events: "Events",
    create_event: "Create Event",
    teams: "Teams",
    contact: "Contact",
    login: "Login",
    pricing: "Pricing",
    manager: "Manager",
  },

  become_a_manager: {
    welcome: "Welcome to Tessera!",
    proceed:
      "Are you an event manager? Complete your profile and start creating events.",
    continue_as_manager: "Continue as Manager",
    customer: "Customer",
    manager: "Event Manager",
    skip: "I'm here to buy tickets, Skip",
    select_plan: "Select Plan",
    choose_plan:
      "Choose the plan that works best for you. When contacting us, please specify which plan you are interested in and what additional information you need.",
    full_list_of_features: "Full List of Features",
    selected_plan: "Selected Plan",
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
    welcome: "Welcome to Tessera, {{name}}",
    learn_how_button: "Learn How",
    get_in_touch_button: "Get in Touch",
    login_page: {
      secure_spot: "Secure your spot.",
      external_user: "External user without a KTH account?",
      for_business_inquiries:
        "For business inquiries, please contact <1>Lucas Dow</1>, the creator of Tessera.",
    },
    page_description: {
      what_title: "What is Tessera?",
      what: "Tessera is a platform that simplifies ticket releases. Purchasing tickets should not be a hassle. Tessera makes it easy to create and manage ticket releases. Event organizers can easily view preferences and allergies to enhance your experience, without any extra effort. Your account is automatically linked to your tickets, eliminating the need for additional forms.",
      in_beta_title: "Tessera BETA",
      in_beta:
        "Tessera is currently in BETA, meaning it is still being developed and improved. If your organization is interested in using Tessera BETA, we will set up a team for you free of charge. This allows you to create and manage events while providing valuable feedback to help us improve Tessera. Contact us to get started!",
      how_title: "How Does It Work?",
      how: "To create a ticket release for your event, you must first become an event organizer by creating a team. Currently, teams are created by contacting us. Once your team is set up, you can start creating and managing ticket releases, and invite other members to help. Users can view public events under the 'Events' tab. Tessera offers various ticket distribution methods like lotteries and first-come-first-served systems. Users request tickets, and once the release closes, tickets are allocated based on the chosen method. For questions, feel free to contact us.",
    },
    get_in_touch: {
      quote1:
        "I'm very proud of Tessera because it's the first software I've developed that's used by a large number of people.",
      quote2:
        "If your organization or team is looking for an easy-to-use event and ticket management system, please contact me.",
    },
    how_to_use: {
      request_ticket_title: "Request a Ticket",
      request_ticket:
        "Tessera's innovative ticket distribution allows users to request tickets through methods like lotteries or first-come-first-served, making the process fairer and more accessible. Go to the 'Events' tab, find your event, and click 'Request' to begin.",
      fill_out_title: "Fill Out Personal Details",
      fill_out:
        "After requesting a ticket, provide personal details like food preferences and allergies. This helps organizers tailor the event to your needs, ensuring a personalized experience. Tessera links your account to your tickets, streamlining the process and enhancing your event experience.",
      wait_title: "Wait for Ticket Allocation",
      wait: "After requesting a ticket, wait for the ticket release to close and for tickets to be allocated by lottery or first-come-first-served basis. Tessera ensures fair distribution, so monitor your email or Tessera account for updates. If successful, you'll receive further instructions, including payment details if necessary.",
    },
  },
  tooltips: {
    add_ticket_type: "Add Ticket Batch",
    manage_ticket_releases: "Manage ticket releases for this event.",
    manage_tickets:
      "This table shows all the ticket requests and tickets for this event.",
    manage_tickets_custom_event_form_description:
      "Here you can see all the form responses for this event. This information was submitted by users when requesting tickets.",
    must_be_edited: "This form must be valid before proceeding.",
  },
  form: {
    required_description: "Fields marked with * are required.",
    event_details: {
      name: "Name",
      name_helperText: "What is the name of your event?",
      description: "Description",
      description_helperText:
        "Describe your event. What should people expect? Markdown is supported.",
      date: "Date",
      date_helperText: "When is your event?",
      end_date: "End Date",
      end_date_helperText: "When does your event end?",
      location: "Location",
      location_helperText: "Where is your event?",
      common_locations: "Commonly Used Locations",
      team: "Team",
      team_helperText:
        "Which team is hosting your event? You need to tie the event to a team. If you're not part of a team, you can create one.",
      private_event: "Private Event",
      private_event_helperText:
        "Is your event private? Only people with the link can see it.",
      collect_food_preferences: "Collect Food Preferences",
      collect_food_preferences_helperText:
        "Do you want to collect food preferences from users?",
    },
    ticket_release: {
      name: "Name",
      name_helperText: "What is the name of your ticket release?",
      description: "Description",
      description_helperText:
        "Describe the types of tickets being released. What should people expect? Markdown is supported.",
      available_at: "Available At",
      available_at_helperText:
        "When will the tickets be released? This is when users can start requesting tickets.",
      closes_at: "Closes At",
      closes_at_helperText:
        "When will the ticket release close? This is when users can no longer request tickets.",
      ticket_release_method: "Ticket Release Method",
      ticket_release_method_helperText:
        "How do you want to distribute tickets?",
      lottery_duration: "Lottery Duration (minutes)",
      lottery_duration_helperText:
        "For First Come First Serve, the lottery duration defines the time frame within which requested tickets will be entered into a lottery. If more tickets are requested than available, all requests within this time frame will enter a lottery, the rest will be reserves.",
      max_tickets_per_user: "Max Tickets per User",
      max_tickets_per_user_helperText:
        "How many tickets can a user request? Currently, it's always 1.",
      tickets_available: "Ticket Quantity",
      tickets_available_helperText: "How many tickets will be available?",
      notification_method: "Notification Method",
      notification_method_helperText:
        "How do you want to notify users about the ticket release?",
      cancellation_policy: "Cancellation Policy",
      cancellation_policy_helperText: "What is your cancellation policy?",
      reserved_ticket_release: "Reserved Ticket Release",
      reserved_ticket_release_helperText:
        "A reserved ticket release contains tickets reserved for specific users. A promo code is required to access these tickets. You can add more ticket releases later.",
      promo_code: "Promo Code",
      promo_code_helperText:
        "What promo code should be used to access this reserved ticket release?",

      selective_description: "Describe the Allocation Method",
      selective_description_helperText:
        "Specify how your team plans to allocate tickets. This information will be shown to users when they request a ticket.",
      save_template: "Save as Template",
      save_template_helperText:
        "Save this ticket release as a template to use again later.",

      payment_deadline: "Payment Deadline",
      payment_deadline_helperText:
        "When is the payment deadline for users who initially got a ticket?",
      reserve_payment_duration: "Reserve Payment Duration",
      reserve_payment_duration_helperText:
        "When a reserve receives a ticket, how long do they have to pay before it's given to the next person in line?",
      allocation_cut_off: "Allocation Cut-off",
      allocation_cut_off_helperText:
        "When will the allocation of tickets be cut off? This is when the system will stop allocating tickets.",
    },
    ticket_types: {
      name: "Name",
      name_helperText: "What is the name of this ticket?",
      description: "Description",
      description_helperText:
        "Describe what's included in this ticket. Markdown is supported.",
      price: "Price (SEK)",
      price_helperText: "How much does this ticket cost?",
      save_template: "Save as Template",
      save_template_helperText:
        "Save this ticket as a template to use again later.",
    },
    contact: {
      title: "Contact",
      email: "Your Email",
      plan: "Plan",
      email_helperText: "What is the contact email for this ticket?",
      subject: "Subject",
      subject_helperText: "What is the subject for this ticket?",
      name: "Your Name",
      name_helperText: "What is the name of the contact person?",
      message: "Message",
      message_helperText: "What is the message for this ticket?",
      success: "Your message has been sent!",
      fail: "Your message could not be sent. Please try again later.",
      description:
        "If you have any questions, problems, or suggestions, feel free to contact us. We will get back to you as soon as possible.",
      team_name: "Team",
      team_helperText: "Which team are you contacting?",
    },

    event_fields: {
      title: "Custom Event Fields",
      subtitle:
        "Add and edit custom fields for your event. These fields will be shown to users when they request a ticket.",
      label_name: "Name",
      label_description: "Description",
      label_type: "Type",
      label_required: "Required",
      form_field_description: "Description",
      form_field_description_helperText:
        "Describe what additional information you want to collect from users, and why. Markdown is supported.",
      delete_field_confirm:
        "Are you sure you want to delete this field? Deleting this field might result in loss of response data. You must save after deleting!",
    },

    addon: {
      name: "Name",
      name_helperText: "What is the name of this addon?",
      description: "Description",
      description_helperText: "Describe this addon. Markdown is supported.",
      price: "Price (SEK)",
      price_helperText: "How much does this addon cost?",
      max_quantity: "Max Quantity",
      max_quantity_helperText: "How many of this addon can a user buy?",
      is_enabled: "Enabled",
      is_enabled_helperText: "An enabled addon is available for purchase.",
      contains_alcohol: "Contains Alcohol",
      contains_alcohol_helperText: "Does this addon involve alcohol?",
    },

    banking_details: {
      bank_name: "Bank Name",
      bank_name_helperText: "Enter the name of the bank.",
      account_holder: "Account Holder",
      account_holder_helperText: "Enter the name of the account holder.",
      clearing_number: "Clearing Number",
      clearing_number_helperText: "Enter the clearing number (e.g., 1234).",
      account_number: "Account Number",
      account_number_helperText: "Enter the account number (e.g., 1234567890).",
      button_save: "Save",
      updated_at: "Last updated {{date}}",
    },

    manager: {
      setup: {
        business_details: {
          legal_name: "Legal Name",
          legal_name_helperText: "Legal name of your business.",
          corporate_id: "Corporate ID",
          corporate_id_helperText: "Corporate ID of your business.",
          store_name: "Store Name",
          store_name_helperText: "Name of your online store.",
          business_email: "Business Email",
          business_email_helperText: "Email of your business.",
          country: "Country",
          country_helperText: "Country of your business.",
          phone_number: "Phone Number",
          phone_number_helperText: "Phone number of your business.",
          address_line1: "Address Line 1",
          address_line1_helperText: "Address Line 1 of your business.",
          address_line2: "Address Line 2",
          address_line2_helperText: "Address Line 2 of your business.",
          city: "City",
          city_helperText: "City of your business.",
          postal_code: "Postal Code",
          postal_code_helperText: "Postal code of your business.",
        },
      },
    },

    button_sign_in: "Sign in",
    button_add_field: "Add Field",
    button_clear: "Clear",
    button_next: "Next",
    button_edit: "Edit",
    button_create: "Create",
    button_back: "Back",
    button_restart: "Restart",
    button_confirm: "Confirm",
    button_cancel: "Cancel",
    button_create_event: "Create Event",
    button_save: "Save",
    button_submit: "Submit",
    button_manage: "Manage",
    button_details: "Details",
    button_request: "Request",
    button_delete: "Delete",
    button_send: "Send",
    button_check_in: "Check in",
    button_update_gdpr: "Save and Renew Consent",
    button_send_out: "Send Out",
    button_economy: "Economy",
    generate_sales_report: "Generate Sales Report",
  },

  create_event: {
    title: "Create Event",
    create_event_description:
      "Create an event to manage ticket releases, attendees, and more. Tessera makes it as easy as possible. We will walk you through the process step by step.",
    event_details_title: "Event Details",
    event_details_description:
      "Let's start with the basics. What are the details of your event?",
    ticket_release_title: "Create Ticket Release",
    ticket_release_description:
      "A ticket releases contains a group of ticket batches. Here you can specify when a batch of tickets will be available for people to request. You also define how tickets will be distributed.",
    ticket_release_description_example:
      "For example, you can create a ticket release for early bird tickets, with Regular and VIP tickets that requires a promo code. Then you can create another ticket release for regular tickets, with its own ticket batches.",
    ticket_release: "Ticket Release",
    ticket_release_helperText:
      "Let's define the details for this ticket release.",
    confirm_event_creation_restart_text:
      "Are you sure you want to restart event creation? All progress will be lost.",
    ticket_types_title: "Ticket Batches",
    ticket_types_description:
      "Define the different types of tickets available for your event. Each ticket release can have multiple ticket batches. You can create more ticket types later on the edit event page. The total amount of tickets will be distributed among the ticket batches. The tickets you create here will automatically be apart of the ticket release you previously defined.",
    ticket_types: "Ticket Batches",
    ticket_types_helperText:
      "Here you can specify the details of your different ticket batches.",
    finish_title: "That's it!",
    finish_description:
      "You have successfully filled out all the details for your event. Click the button below to create your event. You can also go back and edit your event, or do so later on the edit event page.",
    no_teams:
      "You are currently not part of any team, and therefore cannot create an event. To create a team, you need to contact us. Read more on the landing page.",
  },

  templates: {
    title: "Saved Templates",
    ticket_releases: {
      description:
        "You can create new templates by ticking the 'Save as Template' checkbox when creating a ticket release. Here you can see all your saved templates. Click 'Create' to create a new event from a template.",
      no_templates: "There are no templates available.",
    },
    ticket_types: {
      description:
        "Templates for ticket batches are a bit different from ticket releases. Saving a template will assume that you will keep that template for the ticket release you are editing. Editing your template will automatically update all ticket releases that use that template.",
      no_templates: "There are no templates available.",
    },
  },

  profile: {
    title: "Profile",
    full_name: "Full Name",
    email: "Email",
    username: "Username",
    roles: "Roles",
    teams: "Teams",

    links_and_buttons: {
      your_ticket_requests: "My Ticket Requests",
      your_tickets: "My Tickets",
      your_teams: "My Teams",
    },

    food_preferences: {
      title: "Food Preferences",
      allergies_and_dietary_restrictions:
        "Allergies and Dietary Restrictions (Select all that apply)",
      allergies_and_dietary_restrictions_helperText:
        "Select all that apply, leave blank if none.",
      additional_notes: "Additional Notes",
      additional_notes_helperText:
        "Provide any additional notes about your food preferences. Leave blank if none.",
      privacy_policy_title: "Privacy Policy",
      gdpr_agree_helperText:
        "I agree to the processing of my personal data for managing my food preferences according to the <1>Food Preferences Privacy Policy</1>.",
    },

    your_ticket_requests: {
      title: "My Ticket Requests",
      description:
        "Here you can see all the ticket requests you have made. You can cancel a request by selecting it and clicking the cancel button. When the event organizer allocates tickets, you will receive either a ticket or a reserve status. You can see all your tickets and reserve statuses <1>here</1>.",
      upcoming_events: "Upcoming Events",
      no_upcoming_events: "You have no upcoming events.",
      past_events: "Past Events",
      no_past_events: "You have no past events.",
      no_ticket_requests: "You have no ticket requests.",
    },

    your_tickets: {
      title: "My Tickets",
      description:
        "Here you can see all the tickets you have received. You can give up your ticket by clicking on it and choosing 'I no longer wish to attend', which will pass your ticket to the next person in line. If you have not yet been allocated a ticket, you can see your ticket requests <1>here</1>.",
      upcoming_events: "Upcoming Events",
      no_upcoming_events: "You have no upcoming events.",
      past_events: "Past Events",
      no_past_events: "You have no past events.",
      no_tickets: "You have no tickets.",
    },

    your_teams: {
      title: "Your Teams",
      description:
        "Here you can see all the teams you are a part of. Click on a team to see more details. You can create a new team <1>here</1>.",
      not_part_of_any_teams:
        "You are not part of any teams. Read more about creating a team on the landing page.",
      add_user: "Add User",
      add_user_helperText:
        "Enter the email of the user you want to add to this team. You can change their role later. Hint: Username is the same as KTH ID.",
      manage_team_events: "Manage Team Events",
      no_events:
        "There are no events in this team. Create one now <1>here</1>.",
      users: "Users",
      no_users: "There are no users in this team.",
      delete_team: "Delete Team",
      team_name_title: "Team Name",
      edit_team: "Edit Team",
      delete_team_confirmation_title: "Confirm Team Deletion",
      delete_team_confirmation:
        "Are you sure you want to delete this team? This action cannot be undone.",
    },
  },

  create_team: {
    title: "Create Team",
    what_is_a_team: "What is a Team?",
    description:
      "Create a team to organize events and manage users. Team managers can create events, manage ticket sales, and plan events efficiently. You can invite users to join your team and assign different permissions. You can create and join multiple teams and leave teams at any time. Without a team, you cannot create events.",
    teams_created_by_contacting_us:
      "Currently, teams are created by contacting us. We are working on a solution to allow users to create teams themselves.",
    your_teams_text: "Your Teams",
    add_team_title: "Team Name",
    add_team_helperText:
      "This will be the name of your team. You will automatically be the owner of this team.",
    create_team_button: "Create Team",
    add_team_email: "Team Email",
    add_team_email_helperText:
      "This will be the email of your team. It is used for contacting the team.",
  },

  manager: {
    dashboard: {
      events: "Events",
      no_events: "No events yet",
    },

    setup: {
      title: "Setup",
      description: "Complete your profile to start creating events.",
    },

    onboarding: {
      welcomeMessage: "Welcome to Tesseras Event Manager Setup & Onboarding!",
      intro:
        "Welcome to the onboarding setup page for event managers. As an event organizer, you are just a few steps away from setting up your payment processing system through Surfboard Payments. Please follow the instructions below to provide the necessary details and complete the onboarding process.",
      stepByStepGuide: "Step-by-Step Guide to Complete Onboarding",
      steps: {
        step1: {
          title: "Fill in Business Details",
          description:
            "Please provide the necessary business details in the form below. This information will be used to create your merchant account and online store.",
        },
        step2: {
          title: "Fill out KYB Form",
          active: "Click the link below to fill out the KYB form.",
          description:
            "Tessera will generate a Know Your Business (KYB) link for you from the Surfboard Payments partner portal. This link will be sent to your registered email address.",
        },
        step3: {
          title: "Verification Process",
          description:
            "Once you submit your details, Surfboard Payments will verify the legitimacy of your business. This process typically takes 2-4 business days. You will receive a notification via email once your business details have been approved.",
        },
        step4: {
          title: "Account Creation",
          description:
            "After approval, Surfboard Payments will automatically create a merchant account and an online store for your business. You will receive the credentials and relevant information for accessing your merchant account.",
        },
      },
      customization: {
        title: "Customization",
        description:
          "The onboarding web-app can be customized to match the colors and branding of Dow Technologies. If you wish to customize the appearance of your onboarding page, please contact our support team for assistance.",
      },
      importantLinks: {
        title: "Important Links",
        links: {
          partnersGuide:
            "https://developers.surfboardpayments.com/docs/concepts/partners",
          merchantsGuide:
            "https://developers.surfboardpayments.com/docs/concepts/merchants/merchants-home",
          storesGuide:
            "https://developers.surfboardpayments.com/docs/concepts/stores/stores-home",
          terminalsGuide:
            "https://developers.surfboardpayments.com/docs/concepts/terminals/terminals-home",
          onboardingRequirements:
            "https://developers.surfboardpayments.com/docs/concepts/onboarding#requirements-for-onboarding",
          onlinePaymentsGuide:
            "https://developers.surfboardpayments.com/docs/guides/online-payments",
        },
      },
      needHelp: {
        title: "Need Help?",
        description:
          "If you have any questions or need assistance during the onboarding process, please contact our support team at support@dowtechnologies.com or call us at 1-800-123-4567.",
      },
      thankYou: "Thank you for choosing Dow Technologies!",
    },

    settings: {
      general: {
        title: "General Settings",
        description: "Manage your general settings here.",
        main_color: "Main Color",
        accent_color: "Accent Color",
        logo: "Logo URL",
        pick_color: "Pick {{color}}",
        close_color_picker: "Close {{color}} Picker",
        upload_logo: "Upload Logo",
        logo_helperText:
          "The file can not be bigger than 1000x1000 pixels and exceed 2MB.",
        save_settings: "Save Settings",
        save_logo: "Save Logo",
      },
    },

    teams: {
      title: "{{name}} Teams",
    },

    drawer: {
      events: "Events",
      all_events: "All Events",
      teams: "Teams",
      create_event: "Create Event",
      settings: {
        title: "Settings",
        general: "General",
        subscription: "Subscription",
        financial: "Financial",
        users: "Users",
        customize: "Customization",
      },
    },
  },

  features: {
    limit_description:
      "You have exceeded the limit of {{feature}}. Upgrade your plan to get more.",
  },

  manage_event: {
    title: "Manage {{event_name}}",
    delete_button: "Delete {{event_name}}",
    view_button: "View Event Page",
    manage_ticket_releases: "Manage Ticket Releases",
    ticket_release_method_title: "Ticket Release Method",
    ticket_release_ticket_info_title: "Ticket Info",
    ticket_requests: "Ticket Requests",
    lottery_entered_ticket_requests: "Lottery Entered Ticket Requests",
    not_lottery_entered_ticket_requests: "Requested After Lottery Window",
    paid_tickets: "Paid Tickets",
    not_yet_paid_tickets: "Not Yet Paid Tickets",
    refunded_tickets: "Refunded Tickets",
    reserve_tickets: "Reserve Tickets",
    ticket_release_actions_title: "Ticket Release Actions",
    closed: "has closed",
    open: "is open",
    allocate_tickets_button: "Allocate Tickets",
    the_ticket_release: "The ticket release",
    deleted_ticket_requests: "Deleted Ticket Requests",
    remaining_ticket_requests: "Remaining Ticket Requests",
    deleted_tickets: "Deleted Tickets",
    not_open: "Not Open",
    not_yet_open: "Not Yet Open",
    check_allocated_reserve_tickets: "Try to Allocate Reserve Tickets",
    check_allocated_reserve_tickets_tooltip:
      "Press this button to manually allocate reserve tickets. Useful if you don't want to wait for automatic allocation.",
    allocated_tickets: "Allocated Tickets",
    pay_within_hours: "Users must pay within (hours)*",
    edit_payment_deadline: "Edit Payment Deadline",
    payment_deadline: "Payment Deadline",
    payment_deadline_description:
      "Specify the payment deadline for your event. This does not affect already allocated tickets. Only tickets allocated after this change will be affected.",
    payment_deadline_not_editable:
      "Payment deadline is not editable for this ticket release. The payment deadline is set when tickets are allocated.",
    payment_deadline_helperText:
      "When is the payment deadline for users who initially got a ticket?",
    reserve_payment_duration: "Reserve Payment Duration",
    reserve_payment_duration_helperText:
      "When a reserve receives a ticket, how long do they have to pay before it's given to the next person in line?",
    reserve_payment_duration_text:
      "Allocated reserve tickets have a default payment deadline of {{days}} days, {{hours}} hours, {{minutes}} minutes, and {{seconds}} seconds.",
    allocate_tickets_confirm_title: "Confirm Ticket Allocation",
    allocate_tickets_warning:
      "This ticket release is currently open. Allocating tickets now will automatically close the release. Are you sure you want to allocate tickets now?",
    allocate_tickets_confirm:
      "Are you sure you want to close this ticket release?",
    manage_tickets: "Manage Tickets",
    tickets_available: "Total Tickets Available",
    allocate_tickets_helperText:
      "How long do users have to pay for their tickets before they're given to the next person in line?",
    delete_event_title: "Confirm Event Deletion",
    delete_event_confirmation:
      "Are you sure you want to delete this event? This action cannot be undone.",
    delete_event_confirmation_enter_text: "Type 'delete' to confirm deletion.",
    delete_ticket_release_confirmation:
      "Are you sure you want to delete this ticket release? This action cannot be undone.",
    manage_tickets_custom_event_form: "Form Responses",
    add_ticket_release: "Add Ticket Release",
    ticket_release_time_title: "Ticket Release Open and Close",

    breadcrumbs: {
      manage: "Manage",
      edit: "Edit",
      ticket_releases: "Ticket Releases",
      event: "Event",
      addons: "Addons",
      ticket_types: "Ticket Batches",
      form: "Form",
      send_outs: "Send Outs",
      tickets: "Tickets",
      event_page: "Event Page",
    },

    overview: {
      title: "Overview",
      site_visits: "Site Visits",
      unique_visitors: "Unique Visitors",
      num_ticket_requests: "Ticket Requests",
      total_income: "Income",
    },

    ticket_releases: {
      title: "Manage Ticket Releases",
    },

    settings: {
      financial: {
        title: "Financial Settings",
        description:
          "Manage the financial settings for your event. Add your banking details and view the financial status of your event.",
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
        ticket_releases: "Ticket Releases",
        ticket_types: "Ticket Batches",
        form: "Form",
        event_page: "Event Page",
      },

      send_outs: {
        title: "Send Outs",
        list: "List",
        new: "New",
      },

      manage: {
        title: "Overview",
        tickets: "Tickets",
        ticket_releases: "Ticket Releases",
        check_in: "Check In",
        form_responses: "Form Responses",
      },

      economy: {
        title: "Economy",
        sales_report: "Sales Report",
        pay_outs: "Pay Outs",
      },

      is_not_pinned: "Pin Menu",
      is_pinned: "Unpin Menu",
    },

    tickets: {
      title: "Manage Tickets",

      user: {
        info: "User Info",
        food_preferences: "Food Preferences",
        full_name: "Full Name",
        username: "Username",
        id: "ID",
        email: "Email",
        is_external: "External User",
      },

      ticket_info: {
        id: "ID",
        title: "Ticket Info",
        ticket_batch: "Ticket Batch",
        ticket_release: "Ticket Release",
        requested_at: "Requested At",
        is_paid: "Is Paid",
        allocated: "Allocated",
        purchasable_at: "Purchasable At",
        payment_deadline: "Payment Deadline",
        entered_into_lottery: "Entered into Lottery",
        is_reserve: "Is Reserve",
        paid_at: "Paid At",
        checked_in: "Checked In",
        deleted_at: "Deleted At",
        ticket_type: "Ticket Type",

        ticket_types: {
          ticket: "Ticket",
          ticket_request: "Ticket Request",
        },

        add_ons: {
          title: "Addons",
          name: "Name",
          price: "Price",
          quantity: "Quantity",
          contains_alcohol: "Contains Alcohol",
        },

        edit: {
          title: "Edit Ticket Info",
          checked_in_helperText: "Has the user checked in?",
          payment_deadline_helperText:
            "The user will receive an email with the updated payment deadline.",
        },
      },

      event_form: {
        title: "Form Responses",
      },

      ticket_actions: {
        title: "Ticket Actions",
        allocate: "Allocate",
      },

      payment_info: {
        title: "Payment Info",
        currency: "Currency",
        amount: "Amount",
        refunded: "Refunded",
        refunded_at: "Refunded At",
        payment_method: "Payment Method",
      },
    },

    economy: {
      title: "Event Economy",
      subtitle:
        "View the financial details of your event. Generate sales reports and see total revenue.",
      sales_reports: "Sales Reports",
      total_sales: "Total Sales",
      tickets_sold: "Tickets Sold",
      created_at: "Created At",
      status: "Status",
      message: "Message",
      download: "Download",
      no_reports: "There are no sales reports for this event.",
    },

    private_event: {
      title: "This is a Private Event",
      subtitle: "This event is private. Share the link below with invitees.",
    },
    send_out: {
      title: "Send Outs",
      new: "New Send Out",
      description:
        "Send an email to all users who have requested a ticket for this event. Notify users about the ticket release or allocation.",
      preview: "Preview",
      subject: "Subject",
      subject_helperText: "What is the subject of the email?",
      message: "Message",
      message_helperText:
        "What are the contents of the email? Markdown is supported.",
      preview_helperText: "This is how the email will appear to users.",
      ticket_releases: "Select Ticket Releases",
      ticket_releases_helperText:
        "The users of the selected ticket releases will receive the email.",
      filter_tickets: "Filter Tickets",
      filter_tickets_helperText:
        "Filter tickets based on their status. Multiple statuses can be selected.",
      num_users: "The email will be sent to {{numUsers}} users.",

      recipients: "Recipients",
      status_message: "Status Message",
      no_send_outs: "There are no send outs for this event.",
    },
    edit: {
      title: "Edit Event",
      subtitle: "Edit all details of your event here.",
      event_details: {
        title: "Edit Event Details",
      },
      ticket_releases: {
        title: "Edit Ticket Release",
        edit_name: "Edit {{name}}",
        subtitle:
          "Create and edit ticket releases for your event. Create as many as you want.",
        select: "Select a ticket release to edit.",
        add: "Add Ticket Release",
        add_subtitle: "Define the details for this ticket release.",
        closed: "Closed",
        no_ticket_releases: "There are no ticket releases for this event.",
        edit_ticket_types: "Edit Tickets",
        add_helperText: "Select a ticket release to edit.",

        edit_addons: "Edit Ticket Addons",
      },

      addons: {
        title: "Edit Ticket Addons",
        subtitle:
          "Add addons to the ticket release. Be specific with the name and description. Specify if the addon costs extra.",
        form_title: "Addon Form",
        form_subtitle: "Define your addons here.",
        confirm_delete_title: "Confirm Addon Deletion",
        confirm_delete_text:
          "Are you sure you want to delete this addon? This action cannot be undone.",
      },

      ticket_types: {
        title: "Edit Ticket Batches",
        ticket_details: "Ticket Details",
        ticket_details_helperText:
          "Modify the details of your ticket types and then click 'Save'.",
      },

      event_page: {
        title: "Edit Event Page",
        description:
          "Choose between a default event page or customize it to your liking.",
        enable: "Use Custom Event Page",
        enabled: "Enabled",
        disabled: "Disabled",
        editor_title: "The Editor",
        editor_description:
          "The event page editor is a powerful tool to help you create a custom event page. Add text, images, videos, and more to design the page as you want. We take care of the rest.",
        editor_button: "Go to Editor",
      },
    },

    form_field_responses: {
      list_view: "List View",
      table_view: "Table View",
    },
  },

  ticket_release_method: {
    first_come_first_served_title: "First Come First Served",
    first_come_first_served_description:
      "First Come First Serve Lottery is a ticket release method where people who request a ticket within a specified time frame are entered into a lottery. When tickets are allocated, all requests within this time frame are entered into a lottery, and winners are selected randomly. Winners receive a ticket, and the rest are placed on the waitlist. Anyone requesting a ticket after the specified time frame is placed on the waitlist unless the lottery is not full. If the lottery is not full, remaining tickets are distributed to those on the waitlist in the order they requested.",
  },

  ticket_request: {
    cost_overview: "Cost Overview",
    cancel_ticket_request_button: "Cancel Ticket Request",
    go_to_tickets_button: "Go to Tickets",
    cancel_ticket_request_confirm_title: "Confirm Ticket Request Cancellation",
    handled: "Ticket Request converted to ticket",
    deleted: "Ticket Request has been deleted",
    ticket_request: "Ticket Request",
    cancel_ticket_request_confirm:
      "Are you sure you want to cancel this ticket request? This action cannot be undone.",
  },

  event_form_fields: {
    title: "Event Form",
    description:
      "The event organizer has requested additional information from you. See the information below.",
    accept_terms_and_conditions:
      "By submitting this form, you agree to share the above information with the event organizer to plan the event. The information will be processed in accordance with the Chapter's information processing policy.",
    no_form_fields: "Oops! There is no form for this event.",
  },

  tickets: {
    cost_overview: "Cost Overview",
    confirmed_ticket:
      "Your ticket has been confirmed! It's now time to pay for your ticket. Click the button below to pay. If you do not pay before <1>{{payBefore}}</1>, your ticket will be given to the next person in line.",
    reserve_ticket:
      "Unfortunately, you were allocated a reserve ticket for this event. You will be notified if a ticket becomes available.",
    has_paid: "You have paid for your ticket!",

    cancel_ticket_request_button: "Cancel Ticket Request",
    cancel_ticket_button: "I No Longer Wish to Attend",
    confirm_cancel_ticket_title: "Confirm Ticket Cancellation",
    confirm_cancel_ticket_request_title: "Confirm Ticket Request Cancellation",
    leave_reserve_list_text: "Leave Reserve List",
    reserve_number: "You are number <1>{{number}}</1> on the reserve list.",
    paid_ticket:
      "You have paid for your ticket! We look forward to seeing you at the event. A receipt has been sent to your email.",
    confirm_cancel_reserve_ticket_text:
      "Are you sure you want to cancel your ticket? This action cannot be undone!",
    confirm_cancel_ticket_text:
      "Are you sure you want to cancel this ticket? This action cannot be undone!",
    pay_button: "Pay Now",
    not_paid_on_time:
      "Sorry! You did not pay for your ticket on time, so you lost your ticket.",

    payment: {
      title: "Confirm Your Ticket Purchase",
      pay_now: "Pay {{price}} SEK",
      description: "Here you can pay for your ticket.",
    },

    qr_code: {
      description:
        "This is your QR code. Have it ready when you arrive at the event.",
      already_checked_in: "You have already checked in.",
    },
  },

  event: {
    list_title: "Events",
    tickets: "Tickets",
    reserved: "Reserved",
    ticket_releases: "Ticket Releases",
    no_ticket_releases: "There are no ticket releases for this event.",
    event_by: "Event by",
    promo_code_title: "Promo Code",
    promo_code_helperText: "Enter the promo code to access reserved tickets.",
    contact_organizers:
      "If you have any questions, contact <1>{{organization}}</1> <2>here</2>.",
    ticket_request_success_title: "Ticket Request Successful",
    ticket_request_success_description:
      "You can also fill out this information later. Do so <1>here</1>.",
    ticket_releases_description:
      "See all the ticket releases for this event. Request tickets for each release. If you have a promo code, scroll to the bottom of the page to enter it.",
    check_in: {
      scan_ticket_instructions: "Scan the QR code on the ticket to check in.",
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
          "Requests made within the first <1>{{duration}}</1> of the release will be entered into the lottery.",
      },
      reserved: "Reserved",
      no_tickets: "There are no tickets available.",
      remove_reminder: "Remove Reminder",
      set_reminder: "Set Reminder for 10 minutes before release",
      information_processing_policy_info:
        "By requesting a ticket, you agree to share your preferences and details with the event organizer. Information will be processed according to the Chapter's policy, <1>Click Here</1> for more information.",
      checkout: {
        overview: "Overview",
        what_is_a_request_title: "What is a Ticket Request?",
        what_is_a_request:
          "When making a request, you are not guaranteed to get the tickets. The allocation is done according to the Ticket Release Method described in the release description.",
        total: "Total",
        ticket: "Ticket",
      },
      addons: {
        title: "Ticket Addons",
        description: "Add addons to your ticket.",
        max_quantity: "Max Quantity",
        contains_alcohol: "Contains Alcohol",
        view_addons: "View Ticket Addons",
      },
      request_process: {
        complete_ticket_request: "Complete Ticket Request",
        account_required_description:
          "To request a ticket, you must have an account. Sign in or create an account.",
        already_have_an_account: "Already have an account?",
        form: {
          first_name: "First Name",
          last_name: "Last Name",
          email: "Email",
          phone_number: "Phone Number (optional)",
          password: "Password",
          password_repeat: "Repeat Password",
          button_save_account: "Save Account",
          button_save_account_helperText:
            "We will save your details for future purchases.",
          button_sign_up: "Sign Up",
          button_sign_in: "Sign In",
          button_continue_as_guest: "Continue as Guest",
        },
      },
    },
  },

  customer: {
    login: "Login",
    signup: "Sign Up",
    info: {
      subtitle: "Customer Login and Signup",
      description:
        "Welcome to Tessera! By creating an account, all your information will be collected in one place. Easily request tickets, manage your tickets, and more. Note: You don't need an account to request tickets for some events.",
      forgot_password: "Forgot Password?",
      dont_have_an_account: "Don't have an account? Sign up!",
    },
    form: {
      first_name: "First Name",
      last_name: "Last Name",
      username: "Username",
      email: "Email",
      password: "Password",
      password_repeat: "Repeat Password",
      button_signup: "Sign Up",
      button_login: "Login",
      no_account: "Don't have an account? Sign up!",
    },
    forgot_password: {
      title: "Request New Password",
      description:
        "Enter the email address associated with your account to receive a link to reset your password.",
    },
  },

  footer: {
    about_title: "About",
    about_content:
      "Tessera is a platform that makes ticket releases and management easy.",
    quick_links_title: "Quick Links",
    home: "Home",
    events: "Events",
    profile: "Profile",
    report_an_issue_title: "Report an Issue",
    made_by: "Tessera is built by <1>Lucas Dow</1>",
    report_an_issue_content:
      "If something isn't working or you have a suggestion, <1>Create an issue on GitHub</1>.",
    contact_title: "Contact",
    follow_us: "Follow Us",
  },

  common: {
    back: "Back",
    cancel: "Cancel",
    show_all: "Show All",
    show_less: "Show Less",
    show_more: "Show More",
    search: "Search",
    created: "Created",
    made_at: "Made At",
    updated: "Updated",
    private_event: "Private Event",
    hour_one: "hour",
    hour_other: "hours",
    minute_one: "minute",
    minute_other: "minutes",
    mobile_warning:
      "Welcome to Tessera! It appears you are using a mobile device. Some website features may not be optimized for mobile. However, requesting and viewing tickets should work as expected. If you're an event organizer, we recommend using a desktop device.",
  },

  refund: {
    dialog_title: "Refund Ticket",
    reason: "Refund Reason",
    amount: "Refund Amount",
    payment_method: "Payment Method",
    submit: "Process Refund",
    ticket_info: "Ticket ID: {{id}}, Type: {{type}}, Price: {{price}}",
    user_info: "User: {{name}}, Email: {{email}}",
    cannot_refund: "Cannot refund ticket",
  },

  error: {
    no_rows_selected: "No rows selected",
    invalid_refund_selection:
      "Invalid refund selection. Please select a single ticket.",
    ticket_not_found: "Selected ticket not found",
    no_ticket_selected: "No ticket selected for refund",
    unknown: "An unknown error occurred",
  },
  success: {
    delete: "Successfully deleted {{type}}",
    undelete: "Successfully undeleted {{type}}",
    allocate: "Successfully allocated tickets",
    refund_processed: "Refund processed successfully",
  },

  faq: {
    title: "Frequently Asked Questions",
    ...gbFaq,
  },
};

export default enTranslations;
