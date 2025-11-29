export default {
	sendMessage: async () => {
		const userInput = UserInput.text;

		if (!userInput || userInput.trim() === '') {
			showAlert('Bitte geben Sie eine Frage ein', 'warning');
			return;
		}

		try {
			await openai.run();

			if (openai.data?.choices?.[0]?.message?.content) {
				const response = openai.data.choices[0].message.content;
				await storeValue('aiResponse', response);
				await resetWidget('UserInput');
				showAlert('Antwort erhalten!', 'success');
			} else {
				showAlert('Keine Antwort erhalten', 'error');
			}
		} catch (error) {
			showAlert('Fehler: ' + error.message, 'error');
		}
	}
}
