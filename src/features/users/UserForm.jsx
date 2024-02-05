import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchStudentProfileByUser } from "../../services/studentProfile";
import { ROLE } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { useFetchUsers } from "./useFetchUsers";
import { useCreateUser } from "./useCreateUser";
import { useEditUser } from "./useEditUser";
import HeadingBar from "../../components/HeadingBar";
import { Button, CancelButton } from "../../ui/Button";
import Paper from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { AddInput, Input, PasswordInput, SelectInput } from "../../ui/Input";
import { ChipStack, ChipWithDelete } from "../../ui/Chip";

const roles = Object.values(ROLE);

const UserForm = ({ isEditSession }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useToast();

  const { users, usersStatus, isFetching } = useFetchUsers({
    enabled: isEditSession ? true : false,
  });
  const { createUser, isCreating } = useCreateUser({
    onSuccess: () => setFormData(defaultValues),
  });
  const { editUser, isEditing } = useEditUser();

  const isWorking = isFetching || isCreating || isEditing;

  const defaultValues = {
    userData: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      role: ROLE.student,
      isSuspended: false,
    },
    studentData: {
      course: "",
      outstandingFee: 0,
      enrollments: [],
    },
    profileId: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [enrollment, setEnrollment] = useState("");

  useEffect(() => {
    if (isEditSession && usersStatus === "success") {
      setUserToEdit();
    }
  }, [usersStatus, users, isEditSession]);

  const setUserToEdit = async () => {
    const userData = users.data?.filter((el) => el._id === id)[0];

    if (!userData) {
      navigate("/users");
      toast.error("User doesn't exist");
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      userData: {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        isSuspended: userData.isSuspended,
        password: "",
      },
    }));

    if (userData.role === ROLE.student) {
      try {
        const res = await fetchStudentProfileByUser(id);
        const studentData = res.data;

        if (!studentData) {
          throw Error("Can't get student profile.");
        }

        setFormData((prevState) => ({
          ...prevState,
          studentData: {
            course: studentData.course,
            enrollments: studentData.enrollments,
            outstandingFee: studentData.outstandingFee,
          },
          profileId: studentData._id,
        }));
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleChange = (event) => {
    const path = event.target.name;
    const value = event.target.value;
    const keys = path.split(".");

    setFormData((prevState) => ({
      ...prevState,
      [keys[0]]: {
        ...prevState[keys[0]],
        [keys[1]]: value,
      },
    }));
  };

  const handleAddEnrollment = () => {
    if (!enrollment) return;

    setFormData((prevState) => ({
      ...prevState,
      studentData: {
        ...prevState.studentData,
        enrollments: [...prevState.studentData.enrollments, enrollment],
      },
    }));

    setEnrollment("");
  };

  const handleRemoveEnrollment = (data) => {
    const arr = formData.studentData.enrollments;
    const index = arr.indexOf(data);
    arr.splice(index, 1);

    setFormData((prevState) => ({
      ...prevState,
      studentData: {
        ...prevState.studentData,
        enrollments: arr,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const toSubmit = {
      userData: formData.userData,
      studentData: formData.studentData,
    };

    if (isEditSession) {
      if (!toSubmit.userData.password) {
        delete toSubmit.userData.password;
      }

      editUser({ id, data: toSubmit, profileId: formData.profileId });
    } else {
      createUser(toSubmit);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <HeadingBar
          title={isEditSession ? "Edit User" : "Create User"}
          backLink={isEditSession ? `/users/${id}` : "/users"}
        >
          <Button primary="true" disabled={isWorking} type="submit">
            {isEditSession ? "Save Changes" : "Create"}
          </Button>

          <CancelButton />
        </HeadingBar>

        <Paper title="Account Information">
          <FormGroup>
            <Input
              containerProps={{ style: { width: "49%" } }}
              label="Username *"
              id="username"
              name="userData.username"
              value={formData.userData.username}
              onChange={handleChange}
              required
            />

            <PasswordInput
              containerProps={{ style: { width: "49%" } }}
              label="Password *"
              id="password"
              name="userData.password"
              value={formData.userData.password}
              onChange={handleChange}
              required={!isEditSession}
            />
          </FormGroup>
        </Paper>

        <Paper title="User Information">
          <FormGroup style={{ marginBottom: "20px" }}>
            <Input
              containerProps={{ style: { width: "49%" } }}
              id="firstName"
              label="First Name * "
              required
              name="userData.firstName"
              value={formData.userData.firstName}
              onChange={handleChange}
            />

            <Input
              containerProps={{ style: { width: "49%" } }}
              id="lastName"
              label="Last Name *"
              required
              name="userData.lastName"
              value={formData.userData.lastName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Input
              containerProps={{ style: { width: "49%" } }}
              id="email"
              label="Email *"
              type="email"
              required
              name="userData.email"
              value={formData.userData.email}
              onChange={handleChange}
            />

            <SelectInput
              containerProps={{ style: { width: "49%" } }}
              id="role"
              label="Role *"
              name="userData.role"
              value={formData.userData.role}
              onChange={handleChange}
              options={roles}
              capitalizeOption
            />
          </FormGroup>
        </Paper>

        {formData.userData.role === ROLE.student && (
          <Paper title="Student Information">
            <FormGroup style={{ marginBottom: "20px" }}>
              <Input
                containerProps={{ style: { width: "49%" } }}
                id="course"
                label="Course *"
                required
                name="studentData.course"
                value={formData.studentData?.course}
                onChange={handleChange}
              />

              <Input
                containerProps={{ style: { width: "49%" } }}
                id="outstandingFee"
                label="Outstanding Fee"
                type="number"
                required
                name="studentData.outstandingFee"
                value={formData.studentData?.outstandingFee}
                onChange={handleChange}
              />
            </FormGroup>

            <AddInput
              id="enrollments"
              label="Enrollments"
              name="studentData.enrollments"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              handleAdd={handleAddEnrollment}
            />

            <ChipStack>
              {formData.studentData?.enrollments.map((el, index) => (
                <ChipWithDelete
                  key={index}
                  label={el}
                  onDelete={() => handleRemoveEnrollment(el)}
                  style={{ marginRight: "8px" }}
                />
              ))}
            </ChipStack>
          </Paper>
        )}
      </form>
    </>
  );
};

export default UserForm;
