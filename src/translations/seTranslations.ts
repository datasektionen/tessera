import seFaq from "../assets/faq/se_faq.json";

const seTranslations = {
  tooltips: {
    add_ticket_type: "Lägg till biljettgrupp",
  },
  form: {
    event_details: {
      name: "Namn",
      name_helperText: "Vad är namnet på ditt evenemang?",
      description: "Beskrivning",
      description_helperText:
        "Beskriv vad ditt evenemang handlar om. Vad kan deltagarna förvänta sig?",
      date: "Datum",
      date_helperText: "När är ditt evenemang?",
      location: "Plats",
      location_helperText: "Var hålls ditt evenemang?",
      team: "Lag",
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
        "Beskriv vilken typ av biljetter du släpper. Vad kan deltagarna förvänta sig?",
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
        "Hur många biljetter kan en användare begära?",
      ticket_quantity: "Antal biljetter",
      ticket_quantity_helperText:
        "Hur många biljetter kommer att vara tillgängliga?",
      notification_method: "Notifieringsmetod",
      notification_method_helperText:
        "Hur vill du meddela användare om biljettsläppet?",
      cancellation_policy: "Avbokningspolicy",
      cancellation_policy_helperText: "Vad är avbokningspolicyn?",
      reserved_ticket_release: "Reserverat biljettsläpp",
      reserved_ticket_release_helperText:
        "Ett reserverat biljettsläpp innehåller biljetter som är reserverade för specifika användare. En kampanjkod krävs för att få tillgång till denna biljett. Kom ihåg att du kan lägga till fler biljettsläpp senare.",
      promo_code: "Kampanjkod",
      promo_code_helperText:
        "Vilken kampanjkod ska användas för att få tillgång till detta reserverade biljettsläpp?",
    },
    ticket_types: {
      name: "Namn",
      name_helperText: "Vad är namnet på denna biljett?",
      description: "Beskrivning",
      description_helperText: "Beskriv vad som ingår i denna biljett",
      price: "Pris (SEK)",
      price_helperText: "Hur mycket kostar denna biljett?",
    },

    button_clear: "Rensa",
    button_next: "Nästa",
    button_create: "Skapa",
    button_back: "Tillbaka",
    button_restart: "Starta om",
    button_confirm: "Bekräfta",
    button_cancel: "Avbryt",
    button_create_event: "Skapa evenemang",
    button_save: "Spara",
    button_submit: "Submit",
    button_manage: "Hantera",
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
  },

  // Profile
  profile: {
    title: "Profil",
    full_name: "För- och efternamn",
    email: "E-post",
    username: "Användarnamn",
    role: "Roll",
    teams: "Grupper",

    links_and_buttons: {
      your_ticket_requests: "Dina biljettförfrågningar",
      your_tickets: "Dina biljetter",
      your_teams: "Dina grupper",
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
    },

    your_ticket_requests: {
      title: "Dina biljettförfrågningar",
      description:
        "Här kan du se alla biljettförfrågningar du har gjort. Du kan avbryta en biljettförfrågan genom att klicka på biljettförfrågan och klicka på avbryt-knappen. När evenemangsarrangören tilldelar biljetter kommer du att få antingen en biljett eller en reservstatus. Du kan se alla dina biljetter och reservstatus <1>här</1>.",
      upcoming_events: "Kommande evenemang",
      no_upcoming_events: "Du har inga kommande evenemang.",
      past_events: "Tidigare evenemang",
      no_past_events: "Du har inga tidigare evenemang.",
    },

    your_tickets: {
      title: "Dina biljetter",
      description:
        "Här kan du se alla biljetter du har fått. Du kan ge upp din biljett genom att klicka på biljetten och sedan välja alternativet 'Jag vill inte längre delta', vilket kommer att ge din biljett till nästa person i kön. Om du ännu inte har tilldelats en biljett eller reservbiljett kan du se dina biljettförfrågningar <1>här</1>.",
      upcoming_events: "Kommande evenemang",
      no_upcoming_events: "Du har inga kommande evenemang.",
      past_events: "Tidigare evenemang",
      no_past_events: "Du har inga tidigare evenemang.",
    },

    your_teams: {
      title: "Dina grupper",
      description:
        "Här kan du se alla grupper du är en del av. Klicka på en grupp för att se mer detaljer. Du kan skapa en ny grupp <1>här</1>.",
      not_part_of_any_teams:
        "Du är inte en del av några grupper. Läs mer om att skapa en grupp på startsidan.",
      add_user: "Lägg till användare",
      add_user_helperText:
        "Ange användarnamnet för användaren du vill lägga till i denna grupp. Du kan ändra deras roll senare. Tips: Användarnamn är detsamma som kth-id.",
      manage_team_events: "Hantera grupphändelser",
      no_events:
        "Det finns inga händelser i denna grupp. Skapa en nu <1>här</1>.",
      users: "Användare",
      no_users: "Det finns inga användare i denna grupp.",
    },
  },

  common: {
    show_all: "Visa alla",
    show_less: "Visa mindre",
    search: "Sök",
    created: "Skapad",
  },

  main_page: {
    not_a_pain: "Biljettsläpp ska inte vara struligt!",
    welcome: "{{name}}, Välkommen till",
    learn_how_button: "Lär dig hur",
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
  },
  faq: {
    title: "Vanliga frågor",
    ...seFaq,
  },
};

export default seTranslations;
