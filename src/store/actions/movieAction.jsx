import axios from '../../utils/axios';
import { loadmovie, setLoading, setError } from '../reducers/movieSlice';

export const asyncLoadmovie = (id) => async (dispatch) => {
    try {
        dispatch(setLoading());
        
        // Fetch all required data in parallel for better performance
        const [
            detailResponse,
            externalIdResponse,
            recommendationsResponse,
            similarResponse,
            videosResponse,
            watchProvidersResponse
        ] = await Promise.all([
            axios.get(`/movie/${id}`),
            axios.get(`/movie/${id}/external_ids`),
            axios.get(`/movie/${id}/recommendations`),
            axios.get(`/movie/${id}/similar`),
            axios.get(`/movie/${id}/videos`),
            axios.get(`/movie/${id}/watch/providers`)
        ]);

        // Validate responses
        if (!detailResponse.data) {
            throw new Error('Failed to load movie details');
        }

        const trailer = videosResponse.data.results?.find(m => m.type === 'Trailer') || videosResponse.data.results?.[0];

        const theultimatedetails = {
            detail: detailResponse.data,
            externalid: externalIdResponse.data,
            recommendations: recommendationsResponse.data?.results || [],
            similar: similarResponse.data?.results || [],
            videos: trailer,
            watchproviders: watchProvidersResponse.data?.results || {}
        };

        dispatch(loadmovie(theultimatedetails));
    } catch (error) {
        console.error('Error loading movie:', error);
        const errorMessage = error.response?.data?.status_message || error.message || 'Failed to load movie details';
        dispatch(setError(errorMessage));
    }
};
