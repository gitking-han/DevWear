"use client";
import React from "react";
import LoginForm from "./LoginForm";
import GeneralForm from "./GeneralForm";
import PageContainer from "../components/container/PageContainer";
import { Grid } from "@mui/material";

const Page = () => {
  return (
    <PageContainer title="Form Layout" description="This is Form Layout">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <LoginForm />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <GeneralForm />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Page;
