import { assert } from 'chai';
import ber, { ErrorCode } from '../src';

describe('ber', function () {
	it('can create', function () {
		const e = ber.create({ code: 'hello' });

		assert.equal(e.code, 'hello');
	});

	it('can create w/ code object', function () {
		const code: ErrorCode = {
			code: 'hello',
			message: 'hello message',
		};
		const e = ber.create({ code });

		assert.equal(e.code, code.code);
		assert.equal(e.message, code.message);
	});
});
