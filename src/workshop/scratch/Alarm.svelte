<script>
  export let alarmRef = null;

  const { send } = alarmRef;

  $: status = $alarmRef.value;
  $: ({ count } = $alarmRef.context);
</script>

<div class="alarm">
  <div class="alarmTime">
    {new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })}{' '}
    ({count}) ({$alarmRef.toStrings().join(' ')})
  </div>
  <div
    class="alarmToggle"
    data-active={status === 'active' || undefined}
    style={status === 'pending' ? 'opacity: 0.5' : 'opacity: 1'}
    on:click={() => send('TOGGLE')}
  />
</div>
