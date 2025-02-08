import axios from '../../utils/axios';
import { loadTvShow, setLoading, setError } from '../reducers/tvSlice';

export const asyncLoadTvShow = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    
    const [
      detailResponse,
      recommendationsResponse,
      similarResponse,
      videosResponse,
      watchProvidersResponse
    ] = await Promise.all([
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`)
    ]);

    const theUltimateDetails = {
      detail: detailResponse.data,
      recommendations: recommendationsResponse.data.results,
      similar: similarResponse.data.results,
      videos: videosResponse.data.results,
      watchProviders: watchProvidersResponse.data.results,
    };

    dispatch(loadTvShow(theUltimateDetails));
  } catch (error) {
    dispatch(setError(error.message));
  }
};