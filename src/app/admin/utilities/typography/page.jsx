'use client';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

const TypographyPage = () => {
  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        {/* Default Text */}
        <Grid item xs={12}>
          <DashboardCard title="Default Text">
            <Grid container spacing={3}>
              {[ 
                { variant: 'h1', size: 30, lineHeight: 45, fontWeight: 500 },
                { variant: 'h2', size: 24, lineHeight: 36, fontWeight: 500 },
                { variant: 'h3', size: 21, lineHeight: 31.5, fontWeight: 500 },
                { variant: 'h4', size: 18, lineHeight: 27, fontWeight: 500 },
                { variant: 'h5', size: 16, lineHeight: 24, fontWeight: 500 },
                { variant: 'h6', size: 14, lineHeight: 21, fontWeight: 500 },
                { variant: 'subtitle1', size: 16, lineHeight: 28, fontWeight: 400 },
                { variant: 'subtitle2', size: 14, lineHeight: 21, fontWeight: 400 },
                { variant: 'body1', size: 16, lineHeight: 24, fontWeight: 400 },
                { variant: 'body2', size: 14, lineHeight: 20, fontWeight: 400 },
                { variant: 'caption', size: 12, lineHeight: 19, fontWeight: 400 },
                { variant: 'overline', size: 12, lineHeight: 31, fontWeight: 400 },
              ].map((text, index) => (
                <Grid item xs={12} key={index}>
                  <BlankCard>
                    <CardContent>
                      <Typography variant={text.variant}>
                        {text.variant}. Sample text
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        font size: {text.size} | line-height: {text.lineHeight} | font weight: {text.fontWeight}
                      </Typography>
                    </CardContent>
                  </BlankCard>
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
        </Grid>

        {/* Colored Text */}
        <Grid item xs={12}>
          <DashboardCard title="Colored Text">
            <Grid container spacing={3}>
              {[
                { label: 'Text Primary', color: 'textPrimary' },
                { label: 'Text Secondary', color: 'textSecondary' },
                { label: 'Text Info', color: (theme) => theme.palette.info.main },
                { label: 'Text Primary', color: (theme) => theme.palette.primary.main },
                { label: 'Text Warning', color: (theme) => theme.palette.warning.main },
                { label: 'Text Error', color: (theme) => theme.palette.error.main },
                { label: 'Text Success', color: (theme) => theme.palette.success.main },
              ].map((text, index) => (
                <Grid item xs={12} key={index}>
                  <BlankCard>
                    <CardContent>
                      <Typography variant="h5" sx={{ color: text.color }}>
                        {text.label}
                      </Typography>
                      <Typography variant="body1" sx={{ color: text.color }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                      </Typography>
                    </CardContent>
                  </BlankCard>
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
