import axiosApi from "../axiosApi";

export const OFFICE_TOOLS_SUCCESS = 'OFFICE_TOOLS_SUCCESS';
export const ONE_TOOLS_SUCCESS = 'ONE_TOOLS_SUCCESS';
export const OFFICE_TOOLS_CATEGORY = 'OFFICE_TOOLS_CATEGORY';
export const OFFICE_TOOLS_LOCATION = 'OFFICE_TOOLS_LOCATION';
export const OFFICE_TOOLS_ERROR = 'OFFICE_TOOLS_ERROR';

export const OfficeToolsError = () => ({type: OFFICE_TOOLS_ERROR});
export const orderTools = (tools) => ({type: OFFICE_TOOLS_SUCCESS, tools});
export const orderOneTools = (oneTools) => ({type: ONE_TOOLS_SUCCESS, oneTools});
export const officeToolsCategory = category => ({type: OFFICE_TOOLS_CATEGORY, category});
export const officeToolsLocation = location => ({type: OFFICE_TOOLS_LOCATION, location});

export const addOfficeTools = file => {
    return async (dispatch) => {
        try{
            await axiosApi.post('/officetools', file);
            dispatch(orderOfficeTools())
        }catch (e) {
            dispatch(OfficeToolsError())
        }
    }
};
export const putOfficeTools = (id, file) =>{
    return async (dispatch) => {
      try{
          await axiosApi.put('/officetools/' + id,  file)
      }catch (e) {
          dispatch(OfficeToolsError())
      }
    }
};

export const orderOfficeTools = () => {
    return async (dispatch) => {
        try{
            const res = await axiosApi.get('/officetools');
            dispatch(orderTools(res.data));
            dispatch(orderCategory());
            dispatch(orderLocation())
        }catch (e) {
            dispatch(OfficeToolsError())
        }
    }
};

export const deleteTools = id => {
    return async (dispatch) => {
        try{
            await axiosApi.delete('/officetools/' + id);
            dispatch(orderOfficeTools())
        }catch (e) {
            dispatch(OfficeToolsError())
        }
    }
};

export const orderCategory = () => {
    return async (dispatch) => {
        try{
            const res = await axiosApi.get('/category');
            dispatch(officeToolsCategory(res.data));
        }catch (e) {
            dispatch(OfficeToolsError())
        }
    }
};

export const oneOrderTools = id => {
    return async (dispatch) =>{
        try{
            const res = await axiosApi.get('/officetools/' + id);
            dispatch(orderOneTools(res.data))
        }catch (e) {
            dispatch(OfficeToolsError())
        }
    }
};

export const orderLocation = () => {
  return async (dispatch) => {
      try{
          const res = await axiosApi.get('/location');
          dispatch(officeToolsLocation(res.data))
      }catch (e) {
          dispatch(OfficeToolsError())
      }
  }
};
