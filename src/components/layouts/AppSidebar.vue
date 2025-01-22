<script>
  export default {
    data: () => ({
      drawer: true, // 初期値を false に設定
      links: [
        { icon: 'mdi-account-group', text: 'Friends', to: '/friends' },
        // { icon: 'mdi-send', text: 'Send', to: '/send' },
        // { icon: 'mdi-delete', text: 'Trash', to: '/trash' },
        // { icon: 'mdi-alert-octagon', text: 'Spam', to: '/spam' },
      ],
    }),
  };
</script>

<template>
	<v-navigation-drawer v-model="drawer" app>
		<v-sheet class="pa-4" color="grey-lighten-4">
			<v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
			<div>jack@google.com</div>
		</v-sheet>

		<v-divider></v-divider>

		<v-list>
			<v-list-item
				v-for="link in links"
				:key="link.icon"
				:to="link.to"
				link
			>
				<v-list-item-icon>
					<v-icon>{{ link.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{ link.text }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>