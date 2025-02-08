import axios from '../../utils/axios';
import { loadpeople, setLoading, setError } from '../reducers/peopleSlice';

export const asyncLoadPerson = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    const [
      detailResponse,
      externalIdResponse,
      combinedCreditsResponse,
      imagesResponse
    ] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
      axios.get(`/person/${id}/images`)
    ]);

    const personDetails = {
      detail: detailResponse.data,
      externalid: externalIdResponse.data,
      credits: combinedCreditsResponse.data,
      images: imagesResponse.data
    };

    dispatch(loadpeople(personDetails));
  } catch (error) {
    console.error('Error loading person:', error);
    dispatch(setError(error.message));
  }
};