import { toast } from "react-toastify";
const { default: api } = require("@/utils/api");

const ActionType = {
    GET_DRAFT: "GET_DRAFT",
    CREATE_DRAFT: "CREATE_DRAFT",
    EDIT_DRAFT: "EDIT_DRAFT",
    SAVE_DRAFT: "SAVE_DRAFT",
}

function setGetDraftActionCreator({ draft_detail }) {
    return {
        type: ActionType.GET_DRAFT,
        payload: {
            draft_detail,
        }
    }
}

function setCreateDraftActionCreator({ draft_detail }) {
    return {
        type: ActionType.CREATE_DRAFT,
        payload: {
            draft_detail,
        }
    }
}

function setEditDraftActionCreator({ draft_detail }) {
    return {
        type: ActionType.EDIT_DRAFT,
        payload: {
            draft_detail,
        }
    }
}

function setSaveDraftActionCreator({ draft_detail }) {
    return {
        type: ActionType.SAVE_DRAFT,
        payload: {
            draft_detail,
        }
    }
}

function getDraftDetailById({ id, onSuccess }) {
    return async (dispatch) => {
        try {
            const draft_detail = await api.getDraftById({ id });
            dispatch(setGetDraftActionCreator({ draft_detail }));
            onSuccess();
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
}

function createDraft({ prompt, onSuccess, onError }) {
    return async (dispatch) => {
        try {
            const draft_detail = await api.createDraft({ prompt });
            dispatch(setCreateDraftActionCreator({ draft_detail }));
            toast.success("Pembuatan draf berita berhasil!", {
                position: toast.POSITION.TOP_CENTER,
            });
            console.log(draft_detail);
            onSuccess(draft_detail);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            console.log(error)
            onError();
        }
    }
}

function recreateDraft({ id, prompt, onSuccess, onError }) {
    return async (dispatch) => {
        try {
            const draft_detail = await api.recreateDraft({ id, prompt });
            dispatch(setCreateDraftActionCreator({
                draft_detail,
            }));
            toast.success("Pembuatan ulang draf berita berhasil!", {
                position: toast.POSITION.TOP_CENTER,
            });
            onSuccess(draft_detail);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            onError();
        }
    }
}

function editDraft({ id, content }) {
    return async (dispatch) => {
        try {
            const draft_detail = await api.editDraft({ id, content });
            dispatch(setEditDraftActionCreator({ draft_detail }));
            toast.success("Berhasil menyimpan perubahan.", {
                position: toast.POSITION.TOP_CENTER,
            })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
}

function saveDraftToNew({ id, content }) {
    return async (dispatch) => {
        try {
            const draft_detail = await api.saveDraftToNew({ id, content });
            dispatch(setSaveDraftActionCreator({ draft_detail }));
            toast.success("Berhasil mengirim ke redaktur!", {
                position: toast.POSITION.TOP_CENTER,
            })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
}

function saveDraftToApproved({ id }) {
    return async (dispatch) => {
        try {
            const draft_detail = await api.saveDraftToApproved({ id });
            dispatch(setSaveDraftActionCreator({ draft_detail }));
            toast.success("Berhasil menyetujui review berita!", {
                position: toast.POSITION.TOP_CENTER,
            })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
}


export {
    ActionType,
    setCreateDraftActionCreator,
    setGetDraftActionCreator,
    setEditDraftActionCreator,
    getDraftDetailById,
    createDraft,
    recreateDraft,
    editDraft,
    saveDraftToNew,
    saveDraftToApproved,
}