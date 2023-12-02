import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Paper,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import { Visibility, VisibilityOff, AddCircle } from "@mui/icons-material";
import { toast } from "react-hot-toast";

import {
  createUser,
  updateUser,
  fetchUser,
  deleteUser,
} from "../services/user";
import {
  createStudentProfile,
  fetchStudentProfileByUser,
  updateStudentProfile,
} from "../services/studentProfile";
import { ROLE } from "../constants";
import Toast from "../components/Toast";

const roles = Object.values(ROLE);

const handleCreateUser = async (data) => {
  try {
    const res = await createUser(data.userData);

    if (data.userData.role === ROLE.student) {
      try {
        const studentRes = await createStudentProfile({
          ...data.studentData,
          studentId: res.userId,
        });

        return studentRes;
      } catch (err) {
        await deleteUser(res.userId);

        throw err;
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
};

const handleUpdateUser = async ({ id, profileId, data }) => {
  try {
    const res = await updateUser(id, data.userData);

    if (data.userData.role === ROLE.student) {
      try {
        const studentRes = await updateStudentProfile(
          data.studentData,
          profileId
        );

        return studentRes;
      } catch (err) {
        throw err;
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
};

const UserForm = ({ isEditSession }) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      enrollments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "enrollments",
    control,
  });

  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [enrollment, setEnrollment] = useState("");

  const { id } = useParams();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: isEditSession ? handleUpdateUser : handleCreateUser,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();

      // Invalidate the query to refetch the 'todos' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (isEditSession) {
      handleFetchData();
    }
  }, []);

  const handleFetchData = async () => {
    try {
      const res = await fetchUser(id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = (data) => {
    const enrollments = data.enrollments.map((el) => el.value);

    const objToSubmit = {
      userData: data.userData,
      studentData: {
        ...data.studentData,
        enrollments,
      },
    };

    if (isEditSession) {
      mutate({ id, objToSubmit });
    } else {
      mutate(objToSubmit);
    }
  };

  return (
    <>
      <Toast />
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 700, minHeight: 300 }}>
          <form
            className="register-form"
            name="registerForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>{isEditSession ? "Edit User" : "Create User"}</h1>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  required
                  {...register("userData.username")}
                />
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  {...register("userData.password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "52ch" }}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  {...register("userData.email")}
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  required
                  {...register("userData.firstName")}
                />
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  required
                  {...register("userData.lastName")}
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <InputLabel htmlFor="role" required>
                  Role
                </InputLabel>
                <Select
                  id="role"
                  label="Role"
                  {...register("userData.role", {
                    onChange: (e) =>
                      setIsStudent(e.target.value === ROLE.student),
                  })}
                  defaultValue={ROLE.student}
                >
                  {roles.map((role) => {
                    let text = role.charAt(0).toUpperCase() + role.slice(1);

                    return (
                      <MenuItem key={role} value={role}>
                        {text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <InputLabel htmlFor="role" required>
                  Is Suspended
                </InputLabel>
                <Select
                  id="isSuspended"
                  label="Is Suspended"
                  {...register("userData.isSuspended")}
                  defaultValue={false}
                >
                  <MenuItem key={"false"} value={false}>
                    No
                  </MenuItem>
                  <MenuItem key={"true"} value={true}>
                    Yes
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {isStudent ? (
              <>
                <h1>Student Profile</h1>
                <div>
                  <FormControl sx={{ m: "8px", width: "25ch" }}>
                    <TextField
                      id="course"
                      label="Course"
                      variant="outlined"
                      required
                      {...register("studentData.course")}
                    />
                  </FormControl>

                  <FormControl sx={{ m: "8px", width: "25ch" }}>
                    <TextField
                      id="outstandingFee"
                      label="Outstanding Fee"
                      variant="outlined"
                      type="number"
                      required
                      {...register("studentData.outstandingFee", {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Cannot be negative.",
                        },
                      })}
                      defaultValue={0}
                    />
                  </FormControl>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    width: "54ch",
                    margin: "auto",
                  }}
                >
                  <FormControl sx={{ m: "8px", flex: 1 }}>
                    <TextField
                      id="enrollments"
                      label="Enrollments"
                      variant="outlined"
                      value={enrollment}
                      onChange={(e) => setEnrollment(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <IconButton
                      size="large"
                      onClick={() => {
                        setEnrollment("");
                        append({ value: enrollment.toUpperCase() });
                      }}
                    >
                      <AddCircle fontSize="40" />
                    </IconButton>
                  </FormControl>
                </div>

                <div>
                  <Stack
                    sx={{
                      width: "52ch",
                      margin: "8px auto",
                    }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                    spacing={1}
                  >
                    {fields.map((el, index) => {
                      return (
                        <Chip
                          key={index}
                          label={el.value}
                          onDelete={() => remove(index)}
                        />
                      );
                    })}
                  </Stack>
                </div>
              </>
            ) : (
              <></>
            )}

            <div style={{ marginTop: "36px" }}>
              {isEditSession ? (
                <Button
                  disabled={isLoading}
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{ marginRight: "8px" }}
                >
                  Delete User
                </Button>
              ) : (
                <></>
              )}

              <Button
                disabled={isLoading}
                variant="contained"
                size="large"
                type="submit"
              >
                {isEditSession ? "Edit User" : "Create New User"}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default UserForm;
