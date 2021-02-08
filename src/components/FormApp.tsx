import React, { useState, useEffect } from "react";
import { Box, Text } from "grommet";
import Form from "./Form";
import ResultsButton from "./ResultsButton";
import Button from "./uswds-components/Button";
import { useFormDictionary, useForm } from "./../contexts/form";

import Header from "./Header";
import Footer from "./Footer";

import './formApp.scss'
import './index.scss';

const FormApp: React.FC = (props) => {
  const [back, next, complete] = useFormDictionary("back", "next", "complete");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    setWindowWidth(windowWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  }, [])

  const styles = {
    showElevation: windowWidth > 768,
    fullWidth: windowWidth > 768,
  };

  const {
    form: { questions },
  } = useForm();
  
  let filteredQuestions = questions;

  const setNextPage = (index: number) => {
    setCurrentIndex(index);
    window.scrollTo(0, 0);
  };

  const onClickNext = () => setNextPage(currentIndex + 1);
  const onClickBack = () => setNextPage(currentIndex - 1);

  return (
    <>  
      <div className="content-page">
        <Header showLanguageSelect />
        <main>
          <div className="container">
            {currentIndex > 0 && (
              <div className="back-button-container">
                <Button
                  buttonType="unstyled"
                  onClick={onClickBack}
                  style={{ color: "black" }}
                >
                  &#9666; {back}
                </Button>
              </div>
            )}
            <div className="question-container">
              <Box
                align="start"
                direction="column"
                background="white"
                pad={{ vertical: "small", horizontal: "large", bottom: "large"}}
                elevation={styles.showElevation ? "medium" : ""}  
                responsive
                width={styles.fullWidth ? '500px' : {min: '200px'}}
                margin={{ top: "medium" , bottom: "medium"}}
              >
                <Form question={filteredQuestions[currentIndex]} />
                {currentIndex + 1 < filteredQuestions.length ? (
                  <Button onClick={onClickNext} size="large">
                    {next}
                  </Button>
                ) : (
                  <ResultsButton />
                )}
              </Box>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default FormApp;
