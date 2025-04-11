const form = document.getElementById('kontaktSkjema');
const bekreftelse = document.getElementById('bekreftelse');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Hindrer redirect

  const data = new FormData(form);

  const response = await fetch('https://formspree.io/f/xpwpkdqb', {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    bekreftelse.textContent = 'Takk for din henvendelse!';
    form.reset();
  } else {
    bekreftelse.textContent = 'Noe gikk galt. Prøv igjen senere.';
  }
});