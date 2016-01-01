# RPG - Basic instructions for playing at the bottom

I'm just playing around with making a game trying to practice my skills.
The visual design is low on my todo list so please forgive the appearance it's the bare minimum to test functionality.
Jquery is being used. I started with vanilla JS and had to refactor a lot of the code.
I'm trying to refactor to be more MVC and to be a more functional style
Currently just using local storage for savedChar function, not sure the which way I want to go with it yet.

Creating/loading a character
  To load a character
    just type the name of the character(case senitive),
     click the create character button
  To create a character,
    type the name you would like,
    choose a class from the drop down menu,
    click the create character button
Combat
  Melee class
    choose a ability from the drop down menu,
    click use ability button
  Caster cast
    choose a spell from the spell drop down menu
    click cast spell button
    or
    choose a ability for the ability drop down
    click the use ability button

Passive abilities
  Rest-recovery of hits/mana/stam
    choose rest from ability drop down menu
    click the use ability button
  Move-right now just triggers random combat with mob about the players level
    choose move from abilities drop down menu
    click the use ability button
