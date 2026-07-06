import { ageCalculator } from '../utils/common';

const dateOfBirth = '10-03-2002';

export const aboutMe = {
	name: 'Kaviyarasan C',
	designation: 'Web Developer',
	dateOfBirth,
	age: ageCalculator(dateOfBirth)
};

export const contactInfo = {
	countryCode: '+91',
	phone: '8124212240',
	email: 'cmkkaviyarasanmm.com'
};
