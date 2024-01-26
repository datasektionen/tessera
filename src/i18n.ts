import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
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
        },
      },
      se: {
        translation: {
          // here we will place our translations...
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
              how: "För att skapa ett biljettsläpp till ditt evenemang måste du först bli en evenemangsarrangör genom att skapa ett team. För närvarande skapas team genom att kontakta oss. När du har skapat ett team kan du börja skapa och hantera biljettsläpp. Du kan bjuda in andra användare till ditt team så att de kan hjälpa till att hantera biljettsläppen. Som användare kan du se offentliga evenemang i evenemangsfliken. Tessera fungerar inte som andra biljettplattformar där du måste betala för en biljett direkt. Tessera erbjuder olika sätt att distribuera biljetter på, såsom ett lotterisystem eller ett först till kvarn system. Därför köper inte en användare en biljett, utan begär (Request) en biljett istället. När biljettsläppet stänger används den valda allokationsmetoden för att distribuera biljetter till användarna. Om du har några frågor, tveka inte att kontakta oss.",
            },
          },
        },
      },
    },
  });

export default i18n;
