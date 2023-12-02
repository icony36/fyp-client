import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";

import KnowledgeList from "../components/KnowledgeList";

const createData = (title, description) => ({
  title,
  description,
});

const sample = [
  createData(
    "Registration and Enrollment",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Financial Aid and Scholarships",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Campus Resources and Facilities",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Academic Support and Tutoring",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Housing and Residence Life",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Career Services and Internships",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Student Life and Organizations",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "Health and Wellness Services",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
  createData(
    "IT and Technical Support",
    "This knowledge base provides information on the registration process, enrollment deadlines, course selection guidelines, prerequisites, add/drop procedures, and other relevant details related to registering for classes at the university."
  ),
];

const sleep = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const KnowledgesPage = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...sample]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <div className="list-page">
      <Container className="container">
        <div className="knowledge-actions">
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 400, m: 4 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Knowledge"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <Button
            sx={{ m: 4 }}
            variant="contained"
            onClick={() => navigate("/knowledges/new")}
          >
            New Knowledge
          </Button>
        </div>

        <KnowledgeList data={sample} handleClick={handleClick} />
      </Container>
    </div>
  );
};

export default KnowledgesPage;
