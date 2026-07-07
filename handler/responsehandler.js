export const successResponse = (res, data = null, message = "success", status = 200) => {
    const response = { success: true, message };
    if (data !== null && data !== undefined) {
        response.data = data;
    }
    return res.status(status).json(response);
};

export const errorResponse = (res, message = "internal server error", status = 500, error = undefined) => {
    const response = { success: false, message };
    if (error) {
        response.error = error;
    }
    return res.status(status).json(response);
};

export const validationErrorResponse = (res, errors = [], message = "validation error", status = 400) => {
    return res.status(status).json({ success: false, message, errors });
};
