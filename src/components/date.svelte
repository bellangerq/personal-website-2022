<script>
	import { formatDate } from '$lib/date';
	import Calendar from '../assets/icons/calendar.svelte';

	export let date;
	export let isFeminine = false;
</script>

<div class="date">
	<Calendar class="calendar" />
	<span>
		{isFeminine ? 'Publiée' : 'Publié'} le
		<time datetime={date} class="dt-published">{formatDate(date)}</time>
	</span>
</div>

<style lang="scss">
	.date {
		display: flex;
		align-items: center;
		gap: toRem(8);
		font-size: var(--t-s);
	}

	:global(.calendar) {
		height: toRem(20);
		width: toRem(20);
	}
</style>
