'use client'
import React, { useState } from 'react'
import {
  Grid,
  Box,
  Typography,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Button,
  Checkbox,
  Select,
  FormLabel,
  Radio,
  TextField,
  styled,
  Stack
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import PageContainer from '../components/container/PageContainer'
import DashboardCard from '../components/shared/DashboardCard'

export default function GeneralForm() {
  const [age, setAge] = useState('1')
  const [fileName, setFileName] = useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  const handleFileChange = (event) => {
    const files = event.target.files
    if (files.length > 0) {
      setFileName(files[0].name)
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  return (
    <PageContainer title="Custom Form" description="this is Custom Form">
      <DashboardCard title="General Form">
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid item xs={12} sm={12} lg={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              placeholder="Enter text"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: '16px' }}
            />

            <FormLabel htmlFor="demo-simple-select">Select Dropdown</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={12} lg={4}>
            <FormLabel htmlFor="cname">Company Name</FormLabel>
            <TextField
              id="cname"
              placeholder="Enter text"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: '16px' }}
            />
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={12} lg={4}>
            <FormLabel htmlFor="Industry">Industry Type</FormLabel>
            <TextField
              id="disabled"
              placeholder="Enter text"
              variant="outlined"
              fullWidth
              size="small"
            />
          </Grid>

          {/* Column 4: Gender */}
          <Grid item xs={12} sm={12} lg={12}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
              <Grid container>
                <Grid item xs={12} sm={4} lg={4}>
                  <FormControlLabel value="radio1" control={<Radio />} label="Male" />
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                  <FormControlLabel value="radio2" control={<Radio />} label="Female" />
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                  <FormControlLabel value="radio3" control={<Radio />} label="Other" />
                </Grid>
              </Grid>
            </RadioGroup>
          </Grid>

          {/* Column 5: Industry Type Checkboxes */}
          <Grid item xs={12} sm={12} lg={12}>
            <FormLabel>Industry Type</FormLabel>
            <Grid container>
              <Grid item xs={12} sm={4} lg={4}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Enter text" />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <FormControlLabel control={<Checkbox />} label="Enter text" />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}></Grid>
            </Grid>
          </Grid>

          {/* Column 6: File Upload */}
          <Grid item xs={12} sm={12} lg={4}>
            <FormLabel htmlFor="Select File">Select File</FormLabel>
            <Grid>
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ borderRadius: '10px' }}
              >
                Attachment
                <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
              </Button>

              {fileName && (
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  {fileName}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Column 7: Buttons */}
          <Grid item xs={12} sm={12} lg={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
              <Stack spacing={1} direction="row">
                <Button variant="contained" color="primary">
                  Submit
                </Button>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  )
}
