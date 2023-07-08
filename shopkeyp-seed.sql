DROP DATABASE IF EXISTS shopkeyp;
CREATE DATABASE shopkeyp;

\c shopkeyp;
-- password0, password1, password2
INSERT INTO users (username, password, profile_image, is_admin)
  VALUES 
  ('Shopkeyp', '$2a$13$1U2XPY9X5BArR8geCSSurejbImN5DV1kzVWix2prCIovX051pT5fG', 'https://freeiconshop.com/wp-content/uploads/edd/key-flat.png', 'true'),
  ('TestAdmin', '$2a$13$eSnNeLRCQ5SfWXu5vxVhz.97VhJnhlvnl2WChYEddNRtzc2Zi73Mq', 'https://cdna.artstation.com/p/assets/images/images/034/457/398/large/shin-min-jeong-.jpg?1612345160', 'true'),
  ('TestUser', '$2a$13$M1eNI7FzMHr48q4/0alin.JtSWx0uxpc2ZpTQvExZPtaB8uHbB//u', 'https://cdna.artstation.com/p/assets/images/images/034/457/364/large/shin-min-jeong-.jpg?1612345089', 'false');

INSERT INTO items (name, description, item_image, price, stock, purchasable, created_by)
  VALUES 
  ('Holo Jacket', 'A holographic jacket.', 'https://cdn.discordapp.com/attachments/767917606988021770/927006603062956072/Holo_Jacket.png', 30, 1, true, 1),
  ('Mystery Bottle', 'Tag says "drink me".', 'https://media.discordapp.net/attachments/731421741578059816/851895182692974592/Drink_Me.png', 15, 3, false, 1),
  ('Battery', 'Hydrogen fuel cells are the latest and greatest in battery technology-- aside from their tendency to malfunction.', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029089916686416/Battery.png', 25, 2, true, 1),
  ('Bridge Transfer', 'Unhappy with your current bridge officer or fellow bridgemates?  No problem!  Simply request a transfer.', 'https://media.discordapp.net/attachments/818664539179450399/1127029090222882816/Bridge_Transfer.png', 350, 8, true, 1),
  ('Cherub Wings', 'For navigation.', 'https://media.discordapp.net/attachments/818664539179450399/1127029090537439262/Cherub_Wings.png', 0, 2, false, 1),
  ('Eye Drops', 'For tired, dry eyes.  Gain advantage when exploring new areas.  I may not have sight but I have VISION.', 'https://media.discordapp.net/attachments/818664539179450399/1127029090839433417/Eye_Drops.png', 15, 2, false, 1),
  ('Fuel Cell', 'Its the nuclear power we all know and love that feeds our machines and fuels our wars!  Fuel wisely.', 'https://media.discordapp.net/attachments/818664539179450399/1127029091133030421/Fuel_Cell_Bubble.png', 75, 5, true, 1),
  ('Hoverboard', 'Pull some sick tricks with the latest in hoverboard technology.  Don''t forget to wear a helmet!', 'https://media.discordapp.net/attachments/818664539179450399/1127029091401469963/Hoverboard.png', 200, 5, true, 1),
  ('Expired ID', 'Tired of the grit and grime of hunting bounties?  Then walk the plank, boomer!  A new recruit is taking your place.', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029092227760198/I.D._Expired.png', 250, 3, true, 1),
  ('Hunter ID', 'New to the crew?  Register for your Hunter I.D. to become a permanent part of the family!', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029092647174204/I.D._Hunter.png', 1250, 2, true, 1),
  ('Replacement ID', 'Lost your tags?  Order yourself a new one and maybe even get that ten-year old picture retaken!', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029092932390972/I.D._Replacement.png', 100, 10, true, 1),
  ('Lunar Charcoal', 'Crack these bad boys in half for a witchfire that illuminates a room.  Can also be used for drawing!', 'https://media.discordapp.net/attachments/818664539179450399/1127029263992885318/Lunar_Charcoal_1.png', 15, 5, false, 1),
  ('Mount Saddle', 'For those space cowboys out there, saddle up with your very own mount.  Species restrictions may apply.', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029264286502933/Mount.png', 650, 5, true, 1),
  ('Pet Leash', 'If you''re lonely and you know it, buy a friend!  At least it''s a lot easier than waiting around for one to appear...', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029264752054302/Pet.png', 300, 5, true, 1),
  ('Pet Leash Pink', 'If you''re lonely and you know it, buy a friend!  Get yours in limited edition pixie pink!', 'https://media.discordapp.net/attachments/818664539179450399/1127029264512974928/Pet_2.png', 300, 5, true, 1),
  ('Portable Comm', 'It''s like a walkie talkie... but for space!  Stay connected with friends across the galaxies.  Comes in six colors.', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029264999534703/Portable_Comm.png', 50, 2, true, 1),
  ('Potion', 'Brewed stimulants and chemicals ready to put you on the next level.', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029265267949608/Potion_3.png', 15, 5, false, 1),
  ('Ration Ticket x2', 'You have encountered an error!  To compensate your time, ALIS rewards you two rations tickets.', 'https://media.discordapp.net/attachments/818664539179450399/1127029265624469554/Ration_Ticket_x2.png?', 15, 5, false, 1),
  ('Ration Ticket', 'For all you gacha fanatics out there, test your luck with randomized rations from the ship galley.', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029266098442240/Ration_Ticket.png', 150, 25, true, 1),
  ('Recruit Token', 'Know any rowdy ruff boys looking to party with some pirates?  Invite a fellow space fiend to come aboard!', 'https://cdn.discordapp.com/attachments/818664539179450399/1127029266383634492/Recruit_Token_2.png', 500, 2, true, 1),
  ('Room Change', 'Not getting along with your roommate?  Then trade in for a brand new one!  Complimentary air freshener included. ', 'https://media.discordapp.net/attachments/818664539179450399/1127029266681434184/Room_Change.png', 125, 5, true, 1),
  ('Self-Igniting Letter', 'Write an anonymous letter to a fellow shipmate that stays anonymous after its read.', 'https://media.discordapp.net/attachments/818664539179450399/1127029303478075522/Self-Igniting_Letter_2.png', 15, 1, false, 1);

INSERT INTO transactions (from_user, to_user, action, item_id, quantity, total, admin_id)
  VALUES
  (1, 3, 'purchase', 1, 1, 30, null),
  (2, 3, 'transfer', 2, 1, 0, 2);;

INSERT INTO user_items (user_id, item_id, quantity)
  VALUES
  (3, 1, 1);