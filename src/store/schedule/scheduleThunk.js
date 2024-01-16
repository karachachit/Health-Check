import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const getAllSchedules = createAsyncThunk(
   'schedule/getSchedules',
   async ({ dateFrom, dateUntil }, { rejectWithValue }) => {
      try {
         const params = {}
         if (dateFrom) params.dateFrom = dateFrom
         if (dateUntil) params.dateUntil = dateUntil

         const { data } = await axiosInstance.get('api/schedules', {
            params,
         })

         return data
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
         return rejectWithValue(error)
      }
   }
)

export const addTimesheets = createAsyncThunk(
   'schedule/addTimesheets',
   async ({ formattedIntervals, doctorInfo }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            'api/timesheets',
            formattedIntervals,
            {
               params: {
                  doctorId: doctorInfo.doctor.doctorId,
                  scheduleDate: doctorInfo.date,
               },
            }
         )
         return data
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
         return rejectWithValue(error)
      }
   }
)

export const changeTimesheets = createAsyncThunk(
   'schedule/changeTimesheets',
   async ({ formattedIntervals, doctorInfo }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put(
            'api/timesheets',
            formattedIntervals,
            {
               params: {
                  doctorId: doctorInfo.doctor.doctorId,
                  scheduleDate: doctorInfo.date,
               },
            }
         )
         return data
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
         return rejectWithValue(error)
      }
   }
)

export const deleteTimesheets = createAsyncThunk(
   'schedule/deleteTimesheets',
   async ({ scheduleData, time }) => {
      try {
         await axiosInstance.delete('api/timesheets', {
            params: {
               doctorId: scheduleData.doctor.doctorId,
               scheduleDate: scheduleData.date,
               time,
            },
         })
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
      }
   }
)
