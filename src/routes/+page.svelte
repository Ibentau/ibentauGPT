<script lang="ts">
    let loadingResponse = false;

    let messages: {
        text: string;
        me: boolean;
        source?: string;
    }[] = [
        {
            text: 'How may I help you ?',
            me: false
        },
    ];

    let message = '';

    async function getResponse() {
        try {
            loadingResponse = true;
            messages = [
                ...messages,
                {
                    text: message,
                    me: true
                }
            ];

            const savedMessage = message;
            message = '';
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: savedMessage
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            messages = [
                ...messages,
                {
                    text: data.text,
                    me: false,
                    source: data.source
                }
            ];
        } catch (e) {
            console.error(e);
            alert('Error: ' + e);
        } finally {
            loadingResponse = false;
        }
    }
</script>

<div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
    <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div class="relative flex items-center space-x-4">
            <div class="relative">
				<span class="absolute text-green-500 right-0 bottom-0">
					<svg width="20" height="20">
						<circle cx="8" cy="8" r="8" fill="currentColor"/>
					</svg>
				</span>
                <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                        alt=""
                        class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />
            </div>
            <div class="flex flex-col leading-tight">
                <div class="text-2xl mt-1 flex items-center">
                    <span class="text-gray-700 mr-3">Ibentau x GPT</span>
                </div>
                <span class="text-lg text-gray-600"
                >A technical demo of GPT super-charging a school project</span
                >
            </div>
        </div>
    </div>
    <div
            id="messages"
            class="flex flex-col justify-start space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
        {#each messages as message (message.text)}
            <div class="chat-message">
                <div class:justify-end={message.me} class="flex items-end">
                    <div
                            class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 {message.me
							? 'items-end'
							: 'items-start'}"
                    >
                        <div>
							<span
                                    class="px-4 py-2 rounded-lg inline-block {message.me
									? 'bg-gray-300 text-gray-600 rounded-bl-none'
									: 'bg-blue-600 text-white rounded-bl-none'} "
                            >{message.text}</span
                            >
                        </div>
                    </div>
                    <img
                            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            alt="My profile"
                            class="w-6 h-6 rounded-full order-1"
                    />
                </div>
                {#if message.source !== undefined}
                    <div class="collapse">
                        <input type="checkbox"/>
                        <div class="collapse-title text-sm font-medium">
                            Click to see the source
                        </div>
                        <div class="collapse-content">
                            <p>{message.source}</p>
                        </div>
                    </div>
                {/if}

            </div>
        {/each}

        {#if loadingResponse}
            <div class="chat-message">
                <div class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
							<span
                                    class="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white rounded-bl-none"
                            >
								<div class="animate-pulse">is typing...</div>
							</span>
                        </div>
                    </div>
                    <img
                            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            alt="My profile"
                            class="w-6 h-6 rounded-full order-1"
                    />
                </div>
            </div>
        {/if}
    </div>
    <form on:submit|preventDefault={getResponse} class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex">
            <input
                    required
                    bind:value={message}
                    type="text"
                    placeholder="Write your message!"
                    class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3"
            />
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                        disabled={loadingResponse}
                        type="button"
                        class="disabled:bg-gray-400 inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                    <span class="font-bold">Send</span>
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-6 w-6 ml-2 transform rotate-90"
                    >
                        <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </form>
</div>
