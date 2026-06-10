Hooks.once('ready', async () => {
  if (!game.user?.isGM) return;

  let toml;
  try {
    const response = await fetch('/modules/paths-of-peril/sheet-config.toml');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    toml = await response.text();
  } catch (err) {
    console.error('Paths of Peril | Failed to load sheet-config.toml:', err);
    return;
  }

  let current;
  try {
    current = game.settings.get('pbta', 'sheetConfig');
  } catch (err) {
    console.error('Paths of Peril | Could not read pbta sheetConfig setting:', err);
    return;
  }

  if (current === toml) return;

  try {
    await game.settings.set('pbta', 'sheetConfig', toml);
    ui.notifications.info('Paths of Peril | Sheet config updated — reloading…');
    setTimeout(() => window.location.reload(), 1500);
  } catch (err) {
    console.error('Paths of Peril | Failed to update pbta sheetConfig setting:', err);
    ui.notifications.error('Paths of Peril | Could not update sheet config. See console for details.');
  }
});
