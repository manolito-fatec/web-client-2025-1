import { expect, vi, test } from 'vitest'
import { ref } from 'vue'
import {User} from "../src/types/User";
import {mount} from "@vue/test-utils";
import PrimeVue from 'primevue/config'
import UserManagement from "../src/components/UserManagement.vue";
ref<User[]>([
    {
        id: 1,
        fullname: "Existing User",
        username: "existing",
        role: "ADMIN",
        tool: "Taiga",
        idTool: "123",
        projectTool: "Test",
        email: "existing@example.com",
    }
]);

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

test('Return error when user is empty', async () => {
    // Arrange
    const wrapper = mount(UserManagement, {
        global: {
            plugins: [PrimeVue]
        }
    })
    const fullName = wrapper.find('#fullName');
    //Act
    await fullName.setValue('')

    //Assert
    expect(wrapper.find('.p-error').text()).toBe('Full name is required')

})

// Mock para alert e confirm
window.alert = vi.fn()
window.confirm = vi.fn(() => true)

const wrapper = mount(UserManagement, {
    global: {
        plugins: [PrimeVue]
    }
})

test('Return error when user is empty', async () => {
    const fullName = wrapper.find('#fullName')
    await fullName.setValue('')
    await fullName.trigger('blur')

    expect(wrapper.find('.p-error').text()).toBe('Full name is required')
})

test('Return error for invalid characters', async () => {
    const fullName = wrapper.find('#fullName')
    await fullName.setValue('Nome@Inválido')
    await fullName.trigger('blur')

    expect(wrapper.find('.p-error').text()).toBe('Cannot contain special characters')
})

test('Returns error when the name is too long', async () => {
    const fullName = wrapper.find('#fullName')
    await fullName.setValue('a'.repeat(256))
    await fullName.trigger('blur')

    expect(wrapper.find('.p-error').text()).toBe('Full name must be less than 255 characters')
})

test('Returns no error when valid', async () => {
    const fullName = wrapper.find('#fullName')
    await fullName.setValue('Nome Válido')
    await fullName.trigger('blur')

    expect(wrapper.find('.p-error').exists()).toBe(false)
})

test('Returns error for empty email', async () => {
    const email = wrapper.find('#email')
    await email.setValue('')
    await email.trigger('blur')

    expect(wrapper.find('.p-error').text()).toBe('Email is required')
})

test('Returns error for invalid format', async () => {
    const email = wrapper.find('#email')
    await email.setValue('emailinvalido')
    await email.trigger('blur')

    expect(wrapper.find('.p-error')
        .text()).toBe('Please enter a valid email address')
})

test('Returns error for too long email', async () => {
    const email = wrapper.find('#email')
    await email.setValue('a'.repeat(256) + '@test.com')
    await email.trigger('blur')

    expect(wrapper.find('.p-error').text()).toBe('Email must be less than 255 characters')
})

test('Returns no error for valid email', async () => {
    const email = wrapper.find('#email')
    await email.setValue('valido@email.com')
    await email.trigger('blur')

    expect(wrapper.find('.p-error').exists()).toBe(false)
})

test('Returns error for empty username', async () => {
    const username = wrapper.find('#username')
    await username.setValue('')
    await username.trigger('blur')

    expect(wrapper.findAll('.p-error').at(0).text()).toBe('Username is required')
})

test('Returns error for invalid characters', async () => {
    const username = wrapper.find('#username')
    await username.setValue('user@name')
    await username.trigger('blur')

    expect(wrapper.findAll('.p-error').at(0).text()).toBe('Only letters, numbers and underscores allowed')
})

test('Returns error for too long username', async () => {
    const username = wrapper.find('#username')
    await username.setValue('a'.repeat(256))
    await username.trigger('blur')

    expect(wrapper.findAll('.p-error').at(0).text()).toBe('Username must be less than 255 characters')
})

test('Returns no error for valid username', async () => {
    const username = wrapper.find('#username')
    await username.setValue('username_valido123')
    await username.trigger('blur')

    expect(wrapper.find('.p-error').exists()).toBe(false)
})

test('Does not submit when there are validation errors', async () => {
    const initialUserCount = wrapper.vm.users.length

    await wrapper.find('#fullName').setValue('')
    await wrapper.find('#username').setValue('')
    await wrapper.find('#email').setValue('invalido')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.users.length).toBe(initialUserCount)
})

test('Adds new user when valid', async () => {
    const initialUserCount = wrapper.vm.users.length

    await wrapper.find('#fullName').setValue('Novo Usuário')
    await wrapper.find('#username').setValue('novouser')
    await wrapper.find('#email').setValue('novo@email.com')
    await wrapper.find('#password input').setValue('senha123')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.users.length).toBe(initialUserCount + 1)
    expect(wrapper.vm.users[initialUserCount].fullname).toBe('Novo Usuário')
})

test('Clears form after successful submission', async () => {
    await wrapper.find('#fullName').setValue('Usuário Teste')
    await wrapper.find('#username').setValue('testuser')
    await wrapper.find('#email').setValue('teste@email.com')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.newUser.fullname).toBe('')
    expect(wrapper.vm.newUser.username).toBe('')
    expect(wrapper.vm.newUser.email).toBe('')
})

test('Clears all form fields', async () => {
    await wrapper.find('#fullName').setValue('Usuário para limpar')
    await wrapper.find('#username').setValue('toclear')
    await wrapper.find('#email').setValue('clear@example.com')

    await wrapper.find('#cleanAll').trigger('click')

    expect(wrapper.vm.newUser).toEqual({
        fullname: "",
        username: "",
        role: "ADMIN",
        tool: "Taiga",
        idTool: "",
        projectTool: "",
        password: "",
        email: "",
    })
})
