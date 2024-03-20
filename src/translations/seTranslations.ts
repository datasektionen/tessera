import seFaq from "../assets/faq/se_faq.json";

const seTranslations = {
  navigation: {
    events: "Evenemang",
    create_event: "Skapa evenemang",
    teams: "Grupper",
    contact: "Kontakt",
    login: "Logga in",
  },

  tooltips: {
    add_ticket_type: "Lägg till biljettgrupp",
    manage_ticket_releases: "Hantera biljettsläpp för detta evenemang.",
    manage_tickets:
      "Tabellen visar alla biljettförfrågningar och biljetter för detta evenemang.",
    manage_tickets_custom_event_form_description:
      "Här kan du se alla anpassade evenemangsfält som användare har fyllt i när de begärde biljetter.",
  },

  form: {
    required_description: "Fält markerade med * är obligatoriska.",
    event_details: {
      name: "Namn",
      name_helperText: "Vad är namnet på ditt evenemang?",
      description: "Beskrivning",
      description_helperText:
        "Beskriv vad ditt evenemang handlar om. Vad kan deltagarna förvänta sig? Markdown stöds.",
      date: "Datum",
      date_helperText: "När är ditt evenemang?",
      end_date: "Slutdatum",
      end_date_helperText: "När slutar ditt evenemang?",
      location: "Plats",
      location_helperText: "Var hålls ditt evenemang?",
      team: "Grupp",
      team_helperText:
        "Vilken grupp står värd för ditt evenemang? Du måste koppla evenemanget till ett grupp. Om du inte tillhör en grupp kan du skapa ett, läs mer på startsidan.",
      private_event: "Privat evenemang",
      private_event_helperText:
        "Är ditt evenemang privat? Om så är fallet kan bara personer med länken se det.",
    },
    ticket_release: {
      name: "Namn",
      name_helperText: "Vad är namnet på biljettsläppet?",
      description: "Beskrivning",
      description_helperText:
        "Beskriv vilken typ av biljetter du släpper. Vad kan deltagarna förvänta sig? Markdown stöds.",
      available_at: "Tillgänglig från",
      available_at_helperText:
        "När släpps biljetterna? Detta är tidpunkten då användare kan börja begära biljetter.",
      closes_at: "Stänger",
      closes_at_helperText:
        "När stänger biljettsläppet? Detta är tidpunkten då användare inte längre kan begära biljetter.",
      ticket_release_method: "Metod för biljettsläpp",
      ticket_release_method_helperText: "Hur vill du distribuera biljetter?",
      lottery_duration: "Lottningstid (minuter)",
      lottery_duration_helperText:
        "För Först till kvarn, definierar lottningstiden inom hur många minuter efterfrågade biljetter kommer att ingå i en lottning. Om fler biljetter efterfrågas än tillgängligt, kommer alla deltagare som begär biljetter inom denna tidsram att delta i en lottning, övriga blir reserv.",
      max_tickets_per_user: "Max biljetter per användare",
      max_tickets_per_user_helperText:
        "Hur många biljetter kan en användare begära? Alltid 1 för nuvarande.",
      tickets_available: "Antal biljetter",
      tickets_available_helperText:
        "Hur många biljetter kommer att vara tillgängliga?",
      notification_method: "Notifieringsmetod",
      notification_method_helperText:
        "Hur vill du meddela användare om biljettsläppet?",
      cancellation_policy: "Avbokningspolicy",
      cancellation_policy_helperText: "Vad är avbokningspolicyn?",
      reserved_ticket_release: "Reserverat biljettsläpp",
      reserved_ticket_release_helperText:
        "Ett reserverat biljettsläpp innehåller biljetter som är reserverade för specifika användare. En promokod krävs för att få tillgång till denna biljett. Kom ihåg att du kan lägga till fler biljettsläpp senare.",
      promo_code: "Promokod",
      promo_code_helperText:
        "Vilken promokod ska användas för att få tillgång till detta reserverade biljettsläpp?",
      allow_external: "Tillåt externa användare",
      allow_external_helperText:
        "Ska externa användare tillåtas att begära biljetter till detta biljettsläpp?",
    },
    ticket_types: {
      name: "Namn",
      name_helperText: "Vad är namnet på denna biljett?",
      description: "Beskrivning",
      description_helperText:
        "Beskriv vad som ingår i denna biljett. Markdown stöds.",
      price: "Pris (SEK)",
      price_helperText: "Hur mycket kostar denna biljett?",
    },

    contact: {
      title: "Kontakt",
      email: "Din E-post",
      email_helperText: "Vad är kontakt-e-posten för denna biljett?",
      subject: "Ämne",
      subject_helperText: "Vad är ämnet för denna biljett?",
      name: "Namn",

      name_helperText: "Vad är namnet på kontaktpersonen?",
      message: "Meddelande",
      message_helperText: "Vad är meddelandet för denna biljett?",
      success: "Ditt meddelande har skickats!",
      fail: "Något gick fel. Försök igen senare.",
      description:
        "Om du har några frågor, problem eller förslag, tveka inte att kontakta oss. Vi kommer att återkomma till dig så snart som möjligt.",
      team_name: "Grupp",
      team_helperText: "Vilken grupp kontaktar du?",
    },

    event_fields: {
      title: "Anpassat formulär",
      subtitle:
        "Här kan du lägga till och redigera formuläret för ditt event. Dessa fält kommer att visas för användaren när de begär en biljett.",
      label_name: "Namn",
      label_description: "Beskrivning",
      label_type: "Typ",
      label_required: "Obligatoriskt",
      form_field_description: "Beskrivning",
      form_field_description_helperText:
        "Beskriv vilken ytterligare information du vill samla in från användaren, och varför. Markdown stöds.",
    },

    button_add_field: "Lägg till fält",
    button_clear: "Rensa",
    button_next: "Nästa",
    button_create: "Skapa",
    button_edit: "Redigera",
    button_back: "Tillbaka",
    button_restart: "Starta om",
    button_confirm: "Bekräfta",
    button_cancel: "Avbryt",
    button_create_event: "Skapa evenemang",
    button_save: "Spara",
    button_submit: "Submit",
    button_manage: "Hantera",
    button_details: "Detaljer",
    button_request: "Begär biljett(er)",
    button_delete: "Radera",
    button_send: "Skicka",
    button_check_in: "Checka in",
    button_update_gdpr: "Spara och uppdatera GDPR samtycke",
    button_send_out: "Utskick (BETA)",
    button_economy: "Ekonomi (BETA)",
    generate_sales_report: "Generera försäljningsrapport",
  },
  create_event: {
    title: "Skapa evenemang",
    create_event_description:
      "Skapa ett evenemang för att hantera biljettsläpp, deltagare och mer. Ett evenemang består av flera delar, men tessera strävar efter att göra det så enkelt som möjligt. Vi kommer att guida dig genom processen steg för steg.",
    event_details_title: "Evenemangsdetaljer",
    event_details_description:
      "Låt oss börja med grunderna. Vad är detaljerna för ditt evenemang?",
    ticket_release_title: "Skapa biljettsläpp",
    ticket_release_description:
      "Vi fortsättar med biljettsläpp. Här kan du ange när en omgång biljetter blir tillgängliga för folk att begära. Du kan också skapa fler biljettsläpp senare, på sidan för att redigera evenemang.",
    ticket_release: "Biljettsläpp",
    ticket_release_helperText:
      "Låt oss definiera detaljerna för detta biljettsläpp.",
    confirm_event_creation_restart_text:
      "Är du säker på att du vill starta om skapandet av evenemang? Allt framsteg kommer att gå förlorat.",
    ticket_types_title: "Biljettgrupper",
    ticket_types_description:
      "Nästa steg... Biljettgrupper. Här kommer du att definiera de olika typerna av biljetter som kommer att vara tillgängliga för ditt evenemang under det tidigare biljettsläppet. Varje biljettsläpp kan ha flera biljettgrupper. Du kan också skapa fler biljettyper senare, på sidan för att redigera evenemang. Kom ihåg att det totala antalet biljetter som definierats i föregående steg kommer att fördelas mellan biljettgrupperna.",
    ticket_types: "Biljettgrupper",
    ticket_types_helperText:
      "Låt oss definiera de olika grupperna av biljetter som kommer att vara tillgängliga för det tidigare biljettsläppet. Clicka på en biljettgrupp för att redigera den.",
    finish_title: "Det var det!",
    finish_description:
      "Du har nu fyllt i alla detaljer för ditt evenemang. Klicka på knappen nedan för att skapa ditt evenemang. Du kan också gå tillbaka och redigera ditt evenemang genom att klicka på tillbaka-knappen. Men du kan också redigera ditt evenemang senare på redigera evenemang-sidan.",
    no_teams:
      "Du är för närvarande inte med i en grupp och kan därför inte skapa ett evenemang. För att skapa en grupp behöver du kontakta oss. Läs mer på startsidan.",
  },

  // Profile
  profile: {
    title: "Profil",
    full_name: "För- och efternamn",
    username: "Användarnamn",
    role: "Roll",
    teams: "Grupper",
    internal_email: "KTH E-post",
    external_email: "E-post",
    preferred_email: "Föredragen e-post",
    edit_preferred_email: "Redigera föredragen e-post",
    edit_preferred_email_description:
      "Här kan du redigera din föredragen e-post. Detta är e-postadressen som du kommer att få alla meddelanden till.",

    links_and_buttons: {
      your_ticket_requests: "Mina biljettförfrågningar",
      your_tickets: "Mina biljetter",
      your_teams: "Mina grupper",
    },

    food_preferences: {
      title: "Matpreferenser",
      allergies_and_dietary_restrictions:
        "Allergier och kost (Välj alla som gäller)",
      allergies_and_dietary_restrictions_helperText:
        "Välj alla som gäller, lämna blankt om inga gäller.",
      additional_notes: "Ytterligare anteckningar",
      additional_notes_helperText:
        "Ange eventuella ytterligare anteckningar här angående dina matpreferenser. Lämna blankt om du inte har några.",
      privacy_policy_title: "Integritetspolicy",
      gdpr_agree_helperText:
        "Jag har läst och godkänner behandlingen av mina personuppgifter för att hantera mina matpreferenser enligt <1>Integritetspolicy för matpreferenser</1>",
    },

    your_ticket_requests: {
      title: "Dina biljettförfrågningar",
      description:
        "Här kan du se alla biljettförfrågningar du har gjort. Du kan avbryta en biljettförfrågan genom att klicka på biljettförfrågan och klicka på avbryt-knappen. När evenemangsarrangören tilldelar biljetter kommer du att få antingen en biljett eller en reservstatus. Du kan se alla dina biljetter och reservstatus <1>här</1>.",
      upcoming_events: "Kommande evenemang",
      no_upcoming_events: "Du har inga kommande evenemang.",
      past_events: "Tidigare evenemang",
      no_past_events: "Du har inga tidigare evenemang.",
      no_ticket_requests: "Du har inga biljettförfrågningar.",
    },

    your_tickets: {
      title: "Mina biljetter",
      description:
        "Här kan du se alla biljetter du har fått. Du kan ge upp din biljett genom att klicka på biljetten och sedan välja alternativet 'Jag vill inte längre delta', vilket kommer att ge din biljett till nästa person i kön. Om du ännu inte har tilldelats en biljett eller reservbiljett kan du se dina biljettförfrågningar <1>här</1>.",
      upcoming_events: "Kommande evenemang",
      no_upcoming_events: "Du har inga kommande evenemang.",
      past_events: "Tidigare evenemang",
      no_past_events: "Du har inga tidigare evenemang.",
      no_tickets: "Du har inga biljetter.",
    },

    your_teams: {
      title: "Dina grupper",
      description:
        "Här kan du se alla grupper du är en del av. Klicka på en grupp för att se mer detaljer. Du kan skapa en ny grupp <1>här</1>.",
      not_part_of_any_teams:
        "Du är inte en del av någon grupp. Läs mer om att skapa en grupp på startsidan.",
      add_user: "Lägg till användare",
      add_user_helperText:
        "Ange användarnamnet för användaren du vill lägga till i denna grupp. Du kan ändra deras roll senare. Tips: Användarnamn är detsamma som kth-id.",
      manage_team_events: "Hantera grupphändelser",
      no_events:
        "Det finns inga händelser i denna grupp. Skapa en nu <1>här</1>.",
      users: "Användare",
      no_users: "Det finns inga användare i denna grupp.",
      delete_team: "Radera grupp",
      team_name_title: "Gruppnamn",
      edit_team: "Redigera grupp",
      delete_team_confirmation_title: "Bekräfta radering av grupp",
      delete_team_confirmation:
        "Är du säker på att du vill radera denna grupp? Denna åtgärd kan inte ångras.",
    },
  },

  create_team: {
    title: "Skapa grupp",
    what_is_a_team: "Vad är en grupp?",

    description:
      "Här kan du skapa en grupp. Grupper används för att organisera evenemang och hantera användare. Det gör att gruppens ledare kan skapa evenemang, hantera biljettförsäljning och planera evenemanget mer effektivt. Du kan bjuda in andra användare att gå med i din grupp och ge dem olika behörigheter. Du är inte heller begränsad till en grupp, du kan skapa så många du vill, och gå med i så många du vill. Du kan också lämna grupper när som helst. Utan att vara en del av en grupp kan du inte skapa evenemang.",
    teams_created_by_contacting_us:
      "För närvarande skapas grupper genom att kontakta oss. Vi arbetar på en lösning för att låta användare skapa grupper själva",
    your_teams_text: "Dina grupper",
    add_team_title: "Gruppnamn",
    add_team_helperText:
      "Detta kommer att vara namnet på din grupp. Du kommer automatiskt att vara ägare till denna grupp.",
    create_team_button: "Skapa grupp",
    add_team_email: "Gruppens e-post",
    add_team_email_helperText:
      "Detta kommer att vara gruppens e-post. Detta måste vara en giltig e-postadress.",
  },

  manage_event: {
    title: "Hantera evenemang",
    manage_ticket_releases: "Hantera biljettsläpp",
    allocate_tickets_button: "Tilldela biljetter",
    allocated_tickets: "Tilldelade biljetter",
    ticket_release_method_title: "Biljettsläppsmetod",
    ticket_release_ticket_info_title: "Biljettinformation",
    ticket_requests: "Biljettförfrågningar",
    lottery_entered_ticket_requests: "Begärdes under lotterifönstret",
    not_lottery_entered_ticket_requests: "Begärdes utanför lotterifönstret",
    ticket_release_actions_title: "Biljettsläppsåtgärder",
    paid_tickets: "Betalda biljetter",
    not_yet_paid_tickets: "Ännu inte betalda biljetter",
    refunded_tickets: "Återbetalade biljetter",
    not_open: "Inte öppnat än",
    not_yet_open: "Not yet open",
    closed: "har stängts",
    open: "är öppen",
    the_ticket_release: "Biljettsläppet",
    deleted_ticket_requests: "Raderade biljettförfrågningar",
    deleted_tickets: "Raderade biljetter",
    check_allocated_reserve_tickets: "Försök att tilldela reservbiljetter",
    check_allocated_reserve_tickets_tooltip:
      "Genom att trycka på denna knapp kommer du manuellt försöka tilldela reserverade biljetter. Detta är användbart om du inte vill vänta på den automatiska tilldelningen.",
    reserve_tickets: "Reserverade biljetter",
    pay_within_hours: "Användare måste betala inom (timmar)*",
    allocate_tickets_confirm_title: "Bekräfta tilldelning av biljetter",
    allocate_tickets_warning:
      "Detta biljettsläpp är för närvarande öppet. Att tilldela biljetter nu kommer automatiskt att stänga biljettsläppet. Är du säker på att du vill tilldela biljetter nu?",
    allocate_tickets_confirm:
      "Är du säker på att du vill stänga detta biljettsläpp?",
    manage_tickets: "Hantera biljetter",
    tickets_available: "Biljetter tillgängliga",
    allocate_tickets_helperText:
      "Hur lång tid har användare på sig att betala för sina biljetter innan det ges till nästa person i kön?",
    delete_event_title: "Bekräfta radering av evenemang",
    delete_event_confirmation:
      "Är du säker på att du vill radera detta evenemang? Denna åtgärd kan inte ångras.",
    delete_event_confirmation_enter_text: "Skriv in 'delete' för att bekräfta.",
    manage_tickets_custom_event_form: "Anpassade evenemangsfält",
    add_ticket_release: "Lägg till biljettsläpp",

    delete_ticket_release_confirmation:
      "Är du säker på att du vill radera detta biljettsläpp? Denna åtgärd kan inte ångras.",

    economy: {
      title: "Eventekonomi",
      subtitle:
        "Här kan du se ekonomin för ditt evenemang. Du kan generera försäljningsrapporter och se den totala intäkten för ditt evenemang.",
      sales_reports: "Försäljningsrapporter",
      total_sales: "Total försäljning",
      tickets_sold: "Biljetter sålda",
      created_at: "Skapad vid",
      status: "Status",
      message: "Meddelande",
      download: "Ladda ner",
      no_reports: "Det finns inga försäljningsrapporter för detta evenemang.",
    },

    private_event: {
      title: "Detta är ett privat evenemang",
      subtitle:
        "Detta evenemang är privat. Dela länken nedan med de personer du vill bjuda in till evenemanget.",
    },
    send_out: {
      title: "Utskick (BETA)",
      description:
        "Skicka ett e-postmeddelande till alla användare som har begärt en biljett till detta evenemang. Du kan använda detta för att meddela användare om biljettsläppet, eller för att meddela användare som har tilldelats en biljett.",
      preview: "Förhandsgranska",
      subject: "Ämne",
      subject_helperText: "Vad är ämnet för e-postmeddelandet?",
      message: "Meddelande",
      message_helperText:
        "Vad är innehållet i e-postmeddelandet? Markdown stöds.",
      preview_helperText:
        "Så här kommer e-postmeddelandet att se ut för användarna.",
      ticket_releases: "Välj biljettsläpp",
      ticket_releases_helperText:
        "Användarna av de valda biljettsläppen kommer att få e-postmeddelandet.",
      filter_tickets: "Filtrera biljetter",
      filter_tickets_helperText:
        "Filtrera biljetter baserat på deras status. Du kan välja flera statusar.",
      num_users:
        "E-postmeddelandet kommer att skickas till {{numUsers}} användare.",
    },
    edit: {
      title: "Redigera evenemang",
      subtitle: "Här kan du redigera alla detaljer om ditt evenemang.",
      event_details: {
        title: "Redigera evenemangsdetaljer",
      },
      ticket_releases: {
        title: "Redigera biljettsläpp",
        subtitle:
          "Skapa biljettsläpp för ditt evenemang. Du kan skapa så många du vill, och du kan redigera dem senare.",
        select: "Välj ett biljettsläpp för att redigera det.",
        add: "Lägg till biljettsläpp",
        closed: "Stängt",
        add_subtitle:
          "Låt oss lägga till ett annat biljettsläpp. Först måste vi definiera detaljerna för detta biljettsläpp.",
        no_ticket_releases: "Det finns inga biljettsläpp för detta evenemang.",
        edit_ticket_types: "Redigera biljetter",
        add_helperText: "Vänligen välj ett biljettsläpp att redigera.",
      },
      ticket_types: {
        title: "Redigera biljettbatcher",
        ticket_details: "Biljettinformation",
        ticket_details_helperText:
          "Ändra detaljerna för dina biljettyper och klicka sedan på 'Spara'.",
      },
    },
  },

  event_form_fields: {
    title: "Evenemangsformulär",
    description:
      "Evenemangsarrangören har begärt ytterligare information från dig. Se information från evenemangsarrangören nedan.",
    accept_terms_and_conditions:
      "Genom att skicka in detta formulär godkänner du att dela ovanstående information med evenemangsarrangören för att de ska kunna planera evenemanget. Informationen kommer att behandlas i enlighet med kapitlens informationsbehandlingspolicy.",
    no_form_fields: "Oj då! Det finns inget formulär för detta evenemang.",
  },

  event: {
    list_title: "Evenemang",
    tickets: "Biljetter",
    reserved: "Reserverad",
    promo_code_title: "Promokod",
    ticket_releases: "Biljettsläpp",
    event_by: "Evenemang av",
    no_ticket_releases: "Det finns inga biljettsläpp för detta evenemang.",
    promo_code_helperText:
      "Ange promokoden för att få tillgång till reserverade biljetter.",
    contact_organizers:
      "Om du har några frågor, kan du kontakta <1>{{organization}}</1> <2>här</2>.",
    ticket_request_success_title: "Biljettförfrågan skickad!",
    ticket_request_success_description:
      "Vänligen fyll i evenemangsformuläret som finns under biljettbegäran sidan, <1>här</1>. Detta är där du kan ge arrangören ytterligare information.",
    check_in: {
      scan_ticket_instructions: "Skanna QR-koden för att checka in.",
      loading: "Laddar...",
    },
    ticket_release: {
      closed: "Biljettsläppet har stängts",
      tickets_available_in: "Biljetter tillgängliga om",
      tickets_available_for: "Biljettsläppet stänger om",
      method: "Detta biljettsläpp använder <1>{{method}}</1>",
      second: "sekund(er)",
      minute: "minut(er)",
      hour: "timme(ar)",
      day: "dag(ar)",
      week: "vecka(or)",
      month: "månad(er)",
      method_info: {
        fcfsl:
          "Förfrågningar som görs inom de första <1>{{duration}}</1> minuter av biljettsläppet kommer att delta i lotteriet.",
      },
      remove_reminder: "Ta bort påminnelse",
      set_reminder: "Sätt påminnelse 10 minuter innan biljettsläppet öppnar",
      reserved: "Reserverad",
      no_tickets: "Det finns inga biljetter tillgängliga.",
      information_processing_policy_info:
        "Genom att begära en biljett godkänner du att dela dina matpreferenser och användaruppgifter med evenemangsarrangören tills evenemanget är över. Insamlad information kommer att behandlas i enlighet med sektionens informationsbehandlingspolicy, <1>Klicka här</1> för mer information.",
      checkout: {
        overview: "Översikt",
        what_is_a_request_title: "Vad är en biljettförfrågan?",
        what_is_a_request:
          "När du gör en biljettförfrågan är du inte garanterad att få de biljetter du vill ha. Tilldelningen av biljetterna görs enligt metoden för biljettsläpp, som beskrivs i biljettsläppbeskrivningen.",
        total: "Totalt",
        ticket: "Biljett",
      },
    },
  },

  ticket_request: {
    cost_overview: "Prisöversikt",
    cancel_ticket_request_button: "Avbryt biljettförfrågan",
    go_to_tickets_button: "Gå till biljetter",
    cancel_ticket_request_confirm_title:
      "Bekräfta avbrytande av biljettförfrågan",
    handled: "Biljettförfrågan konverterad till biljett",
    deleted: "Raderad biljettförfrågan",
    ticket_request: "Biljettförfrågan",
    cancel_ticket_request_confirm:
      "Är du säker på att du vill avbryta denna biljettförfrågan? Denna åtgärd kan inte ångras.",
  },

  ticket_release_method: {
    first_come_first_served_title: "Först till kvarn",
    first_come_first_served_description:
      "Först till kvarn-lotteriet är en metod för biljettsläpp där personer som begär en biljett inom en angiven tidsram deltar i ett lotteri. När biljetter tilldelas, placeras alla biljettförfråganden inom denna tidsram i ett lotteri och vinnarna väljs slumpmässigt. Vinnarna får en biljett och resten placeras på väntelistan. Alla som begär en biljett efter den angivna tidsramen placeras på väntelistan, om inte lotteriet är ofullständigt. Om lotteriet inte är fullt, ges de återstående biljetterna till personerna på väntelistan i den ordning de begärde biljetten.",
  },

  tickets: {
    cost_overview: "Prisöversikt",
    confirm_cancel_ticket_title: "Bekräfta borttagande av biljett",
    confirmed_ticket:
      "Din biljett har bekräftats! Nu är det dags att betala för din biljett. Du kan betala för din biljett genom att klicka på knappen nedan. Om du inte betalar för din biljett före <1>{{payBefore}}</1> kommer din biljett att ges till nästa person i kön.",
    reserve_ticket:
      "Tyvärr fick du en reservbiljett till detta evenemang. Du kommer att meddelas om en biljett blir tillgänglig.",
    has_paid: "Du har betalat för din biljett!",

    cancel_ticket_request_button: "Avbryt biljettförfrågan",
    cancel_ticket_button: "Jag vill inte längre delta",
    confirm_cancel_ticket_request_title:
      "Bekräfta avbrytande av biljettförfrågan",
    reserve_number: "Du har plats <1>{{number}}</1> på reservlistan.",
    leave_reserve_list_text: "Lämna reservlistan",
    paid_ticket:
      "Du har betalat för din biljett! Vi ser fram emot att se dig på evenemanget. Kvittot kommer att skickas till din e-post.",
    confirm_cancel_reserve_ticket_text:
      "Är du säker på att du vill avbryta din biljett? Du kommer inte att kunna få tillbaka din biljett och denna åtgärd kan inte ångras!",
    confirm_cancel_ticket_text:
      "Är du säker på att du vill lämna reservlistan och avbryta din biljett? Du kommer inte att kunna få tillbaka din biljett och denna åtgärd kan inte ångras!",
    pay_button: "Betala",
    not_paid_on_time:
      "Du har inte betalat för din biljett i tid, därför har din biljett gått till nästa person i kön.",

    payment: {
      title: "Bekräfta ditt biljettköp",
      pay_now: "Betala {{price}} SEK",
      description: "Här kan du betala för din biljett.",
    },
    qr_code: {
      description:
        "Detta är din QR-kod. Var vänlig ha den redo när du anländer till evenemanget.",
      already_checked_in: "Du har redan checkat in.",
    },
  },

  external: {
    login: "Logga in",
    signup: "Registrera dig",
    info: {
      subtitle: "Extern inloggning och registrering.",
      description:
        "Om du inte är en KTH-student kan du fortfarande använda Tessera. Eftersom du dock inte har ett KTH-konto behöver du använda en annan inloggningsmetod. När du använder Tessera kommer du endast att kunna köpa biljetter från biljettsläpp som är specifika för externa användare. Dessa kan inkludera '+1'-biljetter, eller hedersbiljetter för speciella gäster.",
      forgot_password: "Glömt lösenord?",
      dont_have_an_account: "Har du inget konto? Registrera dig!",
      i_have_kth_account:
        "Men jag har ett KTH-konto! Då kan du logga in <1>här</1>.",
    },
    form: {
      first_name: "Förnamn",
      last_name: "Efternamn",
      username: "Användarnamn",
      email: "E-post",
      password: "Lösenord",
      password_repeat: "Upprepa lösenord",
      button_signup: "Registrera dig",
      button_login: "Logga in",
      no_account: "Har du inget konto? Vänligen kontakta oss.", // TODO add email
    },
  },

  common: {
    show_all: "Visa alla",
    show_less: "Visa mindre",
    search: "Sök",
    created: "Skapad",
    made_at: "Gjord",
    updated: "Uppdaterad",
    private_event: "Privat evenemang",
    mobile_warning:
      "Välkommen till Tessera! Vi ser att du använder en mobil enhet. Vissa delar av webbplatsen kanske inte är optimerade för mobila enheter. Men att begära och visa biljetter bör fungera som förväntat. Om du är en evenemangsarrangör rekommenderar vi att du använder en skrivbordsenhet.",
  },

  footer: {
    about_title: "Om",
    about_content:
      "Tessera är en plattform som gör biljettsläpp och biljettadministration enkelt.",
    quick_links_title: "Snabblänkar",
    home: "Hem",
    events: "Evenemang",
    profile: "Profil",
    report_an_issue_title: "Rapportera ett problem",
    made_by:
      "Tessera är byggt av <1>Lucas Dow</1> och tillhör <2>Konglig Datasektionen</2>.",
    report_an_issue_content:
      "Om något inte fungerar, eller om du har ett förslag, kan du <1>Skapa ett problem på Github</1>.",
  },

  main_page: {
    not_a_pain: "Biljettsläpp ska inte vara jobbiga!",
    welcome: "{{name}}, välkommen till",
    learn_how_button: "Lär dig hur",
    get_in_touch_button: "Kontakta",
    login_page: {
      secure_spot: "För att säkra din plats.",
      external_user: "Extern användare utan KTH-konto?",
      for_business_inquiries:
        "För företagsrelaterade förfrågningar, vänligen kontakta <1>Lucas Dow</1>, skaparen av Tessera",
    },
    page_description: {
      what_title: "Vad är Tessera?",
      what: "Tessera är en plattform som gör biljettförsäljning enkel. Att köpa\
            biljetter ska inte vara svårt! Tessera gör det enkelt att skapa\
            biljettsläpp och hantera dem. Evenemangsarrangörer kan enkelt\
            se dina matpreferenser, allergier och mer för att göra din upplevelse\
            så trevlig som möjligt, utan krångel. Ditt konto är automatiskt knutet\
            till dina biljetter, så det finns inget behov av att konstant fylla i google-formulär\
            eller något sådant.",
      how_title: "Hur fungerar det?",
      how: "För att skapa ett biljettsläpp till ditt evenemang måste du först bli en evenemangsarrangör genom att skapa ett team. För närvarande skapas team genom att kontakta oss. När du har skapat ett team kan du börja skapa och hantera biljettsläpp. Du kan bjuda in andra användare till ditt team så att de kan hjälpa till att hantera biljettsläppen. Som användare kan du se offentliga evenemang i evenemangsfliken. Tessera fungerar inte som andra biljettplattformar där du måste betala för en biljett direkt. Tessera erbjuder olika sätt att distribuera biljetter på, såsom ett lotterisystem eller ett först till kvarn system. Därför köper inte en användare en biljett, utan begär (Request) en biljett istället. När biljettsläppet stänger används den valda allokationsmetoden för att distribuera biljetter till användarna. Om du har några frågor, tveka inte att kontakta oss.",
    },
    get_in_touch: {
      quote1:
        "Jag hade egentligen inte tänkt att Tessera skulle lyckas men efter en hel del arbete och slit så blev det ändå något som fungerade. Det är oerhört kul att Tessera används av andra också! ",
      quote2:
        "Om din organisation eller ditt team letar efter ett lättanvänt evenemangs- och biljettadministrationssystem, kontakta mig.",
    },
    how_to_use: {
      request_ticket_title: "Begär en biljett",
      request_ticket:
        "Tesseras innovativa tillvägagångssätt för biljettdistribution gör att användare kan begära biljetter till evenemang genom metoder som ett lotterisystem eller först-till-kvarn, vilket gör processen rättvisare och mer tillgänglig; navigera helt enkelt till fliken för evenemang, hitta ditt evenemang och klicka på 'Begär' för att starta.",
      fill_out_title: "Fyll i personuppgifter",
      fill_out:
        "Efter att ha begärt en biljett måste du ange personuppgifter som matpreferenser och allergier. Denna information hjälper arrangörerna att anpassa evenemanget efter dina behov, vilket garanterar en personlig upplevelse. Tessera länkar ditt konto till dina biljetter, vilket förenklar processen och förbättrar din njutning av evenemanget.",
      wait_title: "Vänta på biljettilldelning",
      wait: "Det sista steget innebär att vänta på att biljettsläppet ska stängas och att biljetter ska tilldelas, antingen via lotteri eller på först-till-kvarn-basis. Tessera garanterar rättvis biljettdistribution, så övervaka din e-post eller Tessera-konto för uppdateringar om din begäranstatus. Om du lyckas får du ytterligare instruktioner, som t.ex betalningsintstruktioner.",
    },
  },
  faq: {
    title: "Vanliga frågor",
    ...seFaq,
  },
};

export default seTranslations;
