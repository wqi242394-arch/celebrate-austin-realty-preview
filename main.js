(function(){
  document.documentElement.classList.add('js');
  var header=document.querySelector('.site-header');
  var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>40)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  var toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
  function setNav(open){toggle.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)}
  toggle.addEventListener('click',function(){setNav(toggle.getAttribute('aria-expanded')!=='true')});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))setNav(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setNav(false)});

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  // Contact form: compose an email in the visitor's mail app (no backend needed)
  var form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements,err=form.querySelector('.form-error'),ok=true;
    ['first','last','email','message'].forEach(function(n){
      var el=f[n],bad=!el.value.trim()||(n==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));
      el.setAttribute('aria-invalid',bad);if(bad)ok=false;
    });
    err.hidden=ok;if(!ok)return;
    var name=f.first.value.trim()+' '+f.last.value.trim();
    var subject=(f.reason.value||'Website inquiry')+' — '+name;
    var body='Name: '+name+'\nEmail: '+f.email.value.trim()+'\nPhone: '+(f.phone.value.trim()||'—')+'\nReason: '+(f.reason.value||'—')+'\n\n'+f.message.value.trim();
    window.location.href='mailto:DouglasTheRealtor@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });}
})();
