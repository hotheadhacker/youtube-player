import { useState } from "react";
import { LanguageContext } from "./LanguageContext";
import PropTypes from "prop-types";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "PT" : "EN"));
  };

  const translations = {
    EN: {
      header: { star: "Star on GitHub" },
      landing: {
        headline: "Distraction Free Youtube Player",
        description:
          "A curated collection of programming tutorials without the distractions of regular YouTube.",
        getStarted: "Get Started",
      },
      body: {
        pageTitle: "What Do You Want To Learn Today?",
        searchPlaceholder: "Search for tutorials...",
        totalVideos: "Total videos:",
        initialTitle: "Search a video or select from the playlist to begin",
        initialDescription: "Select a video",
        skillPrompt: "Select a skill to load tutorial",
        warningSearch: "Please enter a search term!",
        searchButton: "Search",
        errorApi: "YouTube API key is not configured. Cannot perform searches.",
        errorDefault: "An unexpected error occurred.",
        showDescription: "Show Description",
        hideDescription: "Hide Description",
      },
      footer: {
        platformFeatures: "Platform Features",
        keyboardShortcuts: "Keyboard Shortcuts",
        features: {
          adFree: "Ad-Free Experience",
          curated: "Curated Content",
          openSource: "Open Source",
          distractionFree: "Distraction-Free",
          multiplePlaylists: "Multiple Playlists",
          savedProgress: "Saved Progress",
        },
        developedBy: "Developed by",
        redesignedBy: "Redesigned by",
      },
    },
    PT: {
      header: { star: "Dar Star no GitHub" },
      landing: {
        headline: "YouTube Player Sem Distrações",
        description:
          "Uma coleção selecionada de tutoriais de programação sem as distrações do YouTube tradicional.",
        getStarted: "Começar",
      },
      body: {
        pageTitle: "O que você deseja aprender hoje?",
        searchPlaceholder: "Buscar tutoriais...",
        totalVideos: "Total de vídeos:",
        initialTitle: "Procure um vídeo ou selecione da playlist para começar",
        initialDescription: "Selecione um vídeo",
        skillPrompt: "Selecione uma habilidade para carregar o tutorial",
        warningSearch: "Por favor, insira um termo de busca!",
        searchButton: "Buscar",
        errorApi:
          "A chave da API do YouTube não está configurada. Não é possível realizar buscas.",
        errorDefault: "Ocorreu um erro inesperado.",
        showDescription: "Mostrar Descrição",
        hideDescription: "Ocultar Descrição",
      },
      footer: {
        platformFeatures: "Recursos da Plataforma",
        keyboardShortcuts: "Atalhos de Teclado",
        features: {
          adFree: "Experiência sem anúncios",
          curated: "Conteúdo Selecionado",
          openSource: "Código Aberto",
          distractionFree: "Sem Distrações",
          multiplePlaylists: "Múltiplas Playlists",
          savedProgress: "Progresso Salvo",
        },
        developedBy: "Desenvolvido por",
        redesignedBy: "Redesenhado por",
      },
    },
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
