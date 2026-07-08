export function ageCalculator(dob) {
	const today = new Date();
	const birthDate = new Date(dob);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();
	return monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())
		? age - 1
		: age;
}