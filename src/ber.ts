/**
 * error code.
 * used to create a predefined
 * error code and message
 */
export interface ErrorCode {
	/**
	 * error code
	 */
	code: string;

	/**
	 * error message
	 */
	message: string;
}

/**
 * error data
 * object with key value pairs of data
 * containing relevant information
 * regarding the context of the error
 */
export interface ErrorData {
	[key: string]: any;
}

/**
 * error create params. values
 * passed into this object
 * are used to create an error object instance
 */
export interface ErrorParams {
	/**
	 * error code object or string
	 */
	code: ErrorCode | string;

	/**
	 * error message override.
	 * can be use to override the default
	 * error code message
	 */
	message?: string;

	/**
	 * error data if any
	 */
	data?: ErrorData;

	/**
	 * error cause if any
	 */
	cause?: Error;

	/**
	 * is error transient
	 */
	transient?: boolean;
}

/**
 * error interface with additional
 * properties
 */
export interface BError extends Error {
	/**
	 * error code
	 */
	code: string;

	/**
	 * error message
	 */
	message: string;

	/**
	 * error data,
	 * defaults to {}
	 */
	data: ErrorData;

	/**
	 * error cause
	 * defaultsto undefined
	 */
	cause?: Error;

	/**
	 * flag for checking if
	 * its a BError created instance
	 */
	berror: boolean;

	/**
	 * flag for checking if
	 * error is transient.
	 * by default errors are always considered
	 * transient unless explicitly specified
	 */
	transient: boolean;
}

/**
 * create new error instance
 * @param params create params
 * @returns error instance
 */
export function create(params: ErrorParams): BError {
	let code: string | undefined = undefined;
	let message = '';

	// get preset code from string or code+message from code object
	// if code is a string, then message will be the same code
	if (typeof params.code === 'string') {
		code = params.code;
		message = params.code;
	}
	else {
		code = params.code.code;
		message = params.code.message;
	}

	// check if message was overriden in params
	if (params.message) {
		message = params.message;
	}

	const e = new Error(message);
	const be = e as BError;

	// mark as berror
	be.berror = true;

	// set code
	be.code = code;

	// set data
	be.data = params.data ?? {};

	// set cause if any
	if (params.cause) {
		be.cause = params.cause;
	}

	// error is always transient by default
	// mark it as not transient if explicitly set
	be.transient = true;
	if (params.transient === false) {
		be.transient = false;
	}

	return be;
}

/**
 * checks if an error instance is an BError
 * @param e error object * @returns true if BError false otherwise
 */
export function isBError(e: Error): boolean {
	return e && e instanceof Error && (e as any).berror === true;
}

/**
 * gets error data from error object
 * @param e error object
 * @returns error data
 */
export function getData(e: Error): ErrorData {
	return (e as BError)?.data ?? {};
}

/**
 * sets error data for error object
 * @param e error object
 * @param data error data
 */
export function setData(e: Error, data: ErrorData): Error {
	(e as BError).data = data;
	return e;
}

/**
 * gets error code from error object
 * @param e error object
 * @returns error code or empty string if not found
 */
export function getCode(e: Error): string {
	const code = ((e as BError)?.code ?? '').toString();
	return code;
}

/**
 * sets error code for error object
 * @param e error object
 * @param code error code
 */
export function setCode(e: Error, code: string): Error {
	(e as BError).code = code;
	return e;
}

/**
 * hecks if error object is transient
 * @param e error object
 * @returns false if transient flag has been set to false, true otherwise
 */
export function isTransient(e: Error): boolean {
	const transient = (e as BError)?.transient ?? true;
	return transient;
}

/**
 * sets transient flag on error object
 * @param e error object
 * @param transient transient value
 */
export function setTransient(e: Error, transient: boolean): Error {
	(e as BError).transient = transient;
	return e;
}

export default {
	create,
	isBError,
	getData,
	setData,
	getCode,
	setCode,
	isTransient,
	setTransient,
};
