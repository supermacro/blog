type FormattedDateProps = {
	date: Date;
};

const FormattedDate = ({ date }: FormattedDateProps) => {
	const iso = date.toISOString();
	const readable = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

	return <time dateTime={iso}>{readable}</time>;
};

export default FormattedDate;
