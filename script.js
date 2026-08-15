const form = document.querySelector('.application-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = '신청서를 보내는 중이에요…';
  status.textContent = '';
  status.classList.remove('error');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('submit failed');
    form.reset();
    status.textContent = '신청이 접수되었습니다. 수강 확정 및 입금 안내를 문자로 보내드릴게요.';
  } catch (error) {
    status.textContent = '신청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    status.classList.add('error');
  } finally {
    button.disabled = false;
    button.innerHTML = '클래스 신청하기 <span aria-hidden="true">↗</span>';
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
