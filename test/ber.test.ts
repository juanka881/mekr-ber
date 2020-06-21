import { assert } from 'chai';
import ber, { ErrorCode } from '../src';

const code: ErrorCode = {
	code: 'hello',
	message: 'hello message',
};

describe('create', function () {
	it('can create', function () {
		const e = ber.create({ code: 'hello' });

		assert.equal(e.code, 'hello');
		assert.equal(e.message, 'hello', 'defaults message to code if not set');
		assert.deepEqual(e.data, {}, 'defaults data to {} if not set');
		assert.isUndefined(e.cause, 'defaults cause to undefined if not set');
		assert.isTrue(e.berror, 'sets berror = true');
		assert.isTrue(e.transient, 'defaults transient=true if not set');
	});

	it('can create w/ code object', function () {
		const e = ber.create({ code });

		assert.equal(e.code, code.code);
		assert.equal(e.message, code.message);
	});

	it('can create w/ code object but override message', function() {
		const e = ber.create({ code, message: 'foo' });

		assert.equal(e.code, code.code);
		assert.equal(e.message, 'foo');
	});

	it('can create with data', function() {
		const data = { name: 'jojo', age: 21 };
		const e = ber.create({ code: 'hello', data });

		assert.equal(e.code, 'hello');
		assert.deepEqual(e.data, data);
	});

	it('can create with cause', function() {
		const cause = new Error('badwolf');
		const e = ber.create({ code: 'hello', cause });

		assert.equal(e.code, 'hello');
		assert.strictEqual(e.cause, cause);
	});

	it('can create and set transient', function() {
		const e = ber.create({ code: 'hello', transient: false });

		assert.equal(e.code, 'hello');
		assert.isFalse(e.transient);
	});
});

describe('helpers', function() {
	it('can get isBError', function() {
		const be = ber.create({ code: 'hello' });
		const e = new Error('hello');

		assert.isTrue(ber.isBError(be));
		assert.isFalse(ber.isBError(e));
	});

	it('can get/set data', function() {
		const data = { name: 'cake' };
		const be = ber.create({ code: 'hello', data });
		const e = new Error('hello');
		const edata = ber.setData(new Error('hello'), data);

		assert.deepEqual(ber.getData(be), data);
		assert.deepEqual(ber.getData(edata), data);
		assert.deepEqual(ber.getData(e), {});
		assert.deepEqual(ber.getData(undefined as any), {});
	});

	it('can get/set code', function() {
		const code = 'hello';
		const be = ber.create({ code });
		const e = new Error(code);
		const ecode = ber.setCode(new Error(code), code);

		assert.equal(ber.getCode(be), code);
		assert.equal(ber.getCode(e), '');
		assert.equal(ber.getCode(ecode), code);
		assert.equal(ber.getCode(undefined as any), '');
	});

	it('can get/set transient', function() {
		const transient = false;
		const be = ber.create({ code: 'hello', transient });
		const e = new Error('hello');
		const etransient = ber.setTransient(new Error('hello'), transient);

		assert.isFalse(ber.isTransient(be));
		assert.isTrue(ber.isTransient(e));
		assert.isFalse(ber.isTransient(etransient));
		assert.isTrue(ber.isTransient(undefined as any));
	});
});
