import { NumberToRankPipe } from './number-to-rank.pipe';


describe('NumberToRankPipe', () => {
	it('create an instance', () => {
		const pipe = new NumberToRankPipe();
		expect(pipe).toBeTruthy();
	});
});
