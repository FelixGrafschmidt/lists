import { arrow, computePosition, flip, shift, offset } from "@floating-ui/dom"
import { DirectiveBinding, VNode } from "nuxt3/dist/app/compat/capi";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("tooltip", {
		mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
			const tooltipElement = document.createElement("div")
			const arrowElement = document.createElement("div")

			tooltipElement.textContent = binding.value

			tooltipElement.classList.add("hidden", "absolute", "bg-gray-300", "text-black", "p-1", "rounded", "font-sm", "pointer-none")
			arrowElement.classList.add("absolute", "bg-gray-300", "w-2", "h-2", "rotate-45", "transform")

			el.addEventListener("mouseenter", () => {
				tooltipElement.classList.remove("hidden")
				tooltipElement.classList.add("block")
				update(el, tooltipElement, arrowElement)
			})
			el.addEventListener("mouseleave", () => {
				tooltipElement.classList.remove("block")
				tooltipElement.classList.add("hidden")
				update(el, tooltipElement, arrowElement)
			})
			el.addEventListener("blur", () => {
				tooltipElement.classList.remove("block")
				tooltipElement.classList.add("hidden")
				update(el, tooltipElement, arrowElement)
			})

			tooltipElement.appendChild(arrowElement)
			document.body.appendChild(tooltipElement)
			// el.appendChild(tooltipElement)
		}
	})
})


function update(element: HTMLElement, tooltip: HTMLElement, arrowElement: HTMLElement) {
	computePosition(element, tooltip, {
		placement: 'top',
		middleware: [
			offset(6),
			flip(),
			shift({ padding: 5 }),
			arrow({ element: arrowElement }),
		],
	}).then(({ x, y, placement, middlewareData }) => {
		Object.assign(tooltip.style, {
			left: `${x}px`,
			top: `${y}px`,
		});

		// Accessing the data
		const arrowData = middlewareData.arrow;

		const staticSide = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right',
		}[placement.split('-')[0]];

		Object.assign(arrowElement.style, {
			left: arrowData?.x != null ? `${arrowData?.x}px` : '',
			top: arrowData?.y != null ? `${arrowData?.y}px` : '',
			right: '',
			bottom: '',
			[staticSide!]: '-4px',
		});
	});

}
