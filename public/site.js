'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#site-nav');
function closeMenu(){navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
matchMedia('(min-width: 851px)').addEventListener('change',closeMenu);
const serviceSelect=document.querySelector('#contact-service');
document.querySelectorAll('[data-service]').forEach(link=>{const service=link.dataset.service;link.href=`https://wa.me/5527996169171?text=${encodeURIComponent(`Olá, EASY! Quero conversar sobre ${service.toLowerCase()}.`)}`;link.target='_blank';link.rel='noopener noreferrer';link.addEventListener('click',()=>{if([...serviceSelect.options].some(option=>option.value===service))serviceSelect.value=service;});});
const form=document.querySelector('#contact-form');
const nameInput=document.querySelector('#contact-name');
const nameError=document.querySelector('#contact-name-error');
const status=document.querySelector('#contact-status');
const fallback=document.querySelector('#whatsapp-fallback');
function validName(){const valid=Boolean(nameInput.value.trim());nameInput.setAttribute('aria-invalid',String(!valid));nameError.textContent=valid?'':'Informe seu nome para preparar a mensagem.';return valid;}
nameInput.addEventListener('input',()=>{if(nameInput.hasAttribute('aria-invalid'))validName();});
form.addEventListener('input',()=>{fallback.hidden=true;status.textContent='';});
form.addEventListener('submit',event=>{event.preventDefault();if(!validName()){nameInput.focus();return;}const name=nameInput.value.trim();const company=document.querySelector('#contact-company').value.trim();const message=document.querySelector('#contact-message').value.trim();const text=[`Olá, EASY! Meu nome é ${name}.`,company?`Empresa: ${company}`:'',`Tenho interesse em: ${serviceSelect.value}.`,message].filter(Boolean).join('\n\n');const url=`https://wa.me/5527996169171?text=${encodeURIComponent(text)}`;fallback.href=url;fallback.hidden=false;window.open(url,'_blank','noopener,noreferrer');status.textContent='Mensagem preparada. Confira o texto e envie no WhatsApp. Se a nova janela não abriu, use o link abaixo.';});
document.querySelector('#year').textContent=new Date().getFullYear();
