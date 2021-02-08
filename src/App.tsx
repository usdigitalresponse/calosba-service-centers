import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import FormApp from "./components/FormApp";
import { LanguageProvider } from "./contexts/language";
import { FormProvider } from "~/contexts/form";
import Landing from "./components/Landing";
import Results from "./components/Results";

import "./App.scss";

declare function gtag(eventName: String, id: String): any;

const uswdsPrimary = "#005ea2";

const theme = {
  global: {
    text: {
      // align: "center",
    },
    font: {
      size: "14px",
      family: "IBM Plex Sans",
    },
    selected: {
      background: "#008060",
    },
    focus: {
      border: {
        color: "none",
      },
    },
    control: {
      border: {
        color: "black",
      },
    },
    colors: {
      control: { light: uswdsPrimary, dark: "#FFFFFF" },
    },
  },
  text: {
    medium: {
      size: "1.06rem",
    },
  },
  select: {
    icons: {
      color: "#000000",
    },
  },
  radioButton: {
    size: "44px",
    border: {
      color: {
        dark: uswdsPrimary,
      },
    },
    color: "#005ea2",
    check: {
      color: uswdsPrimary,
    },
    icon: {
      size: "40px",
    },
  },
  checkBox: {
    size: "44px",
    border: {
      radius: "8px"
    },
    toggle: {
      background: "blue"
    }
  },
  accordion: {
    heading: {
      margin: "medium",
    }
  }
};

function App() {
  // `theme as any` because grommet has incomplete TS definitions
  return (
    <Grommet className="App" theme={theme as any}>
      <LanguageProvider>
        <Router>
          <Switch>
            <Route exact path="/questions">
              <FormProvider>
                <FormApp/>
              </FormProvider>
            </Route>
            <Route exact path="/results">
              <FormProvider>
                <Results />
              </FormProvider>
            </Route>
            <Route exact path="/">
              <Helmet>
                <link
                  rel="canonical"
                  href="https://businessrelief.usdigitalresponse.org"
                />
              </Helmet>
              <Landing/>
            </Route>
          </Switch>
          <Route
            path="/"
            render={() => {
              if (typeof gtag === "function") {
                gtag("config", "UA-163832126-1");
              }
              return null;
            }}
          />
        </Router>
      </LanguageProvider>
    </Grommet>
  );
}

export default App;
