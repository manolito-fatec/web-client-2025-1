import {expect, vi, test, beforeEach} from 'vitest'
import {ref} from 'vue'
import {User} from "../src/types/User";
import {mount} from "@vue/test-utils";
import PrimeVue from 'primevue/config'
import UserManagementView from "../src/views/UserManagementView.vue";
import {createPinia} from "pinia";
import {UserPag} from "../src/types/PagUser";
import {editUserApi} from "../src/api/EditUserApi";
ref<User[]>([
    {
        id: 1,
        username: "existing",
        roles: ["ADMIN"],
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
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

vi.mock('@/api/EditUserApi.ts', () => ({
    editUserApi: vi.fn()
}))
vi.mock('@/api/RemoveUserApi.ts', () => ({
    removeUserApi: vi.fn()
}))

createPinia()
vi.mock('../src/api/session/stores/auth.ts', () => ({
    useAuthStore: vi.fn(() => ({
        isAuthenticated: true,
        user: { name: 'Test User' },
        login: vi.fn(),
        logout: vi.fn()
    }))
}))

window.alert = vi.fn()
window.confirm = vi.fn(() => true)


beforeEach(() => {
    vi.clearAllMocks()

    wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    component = wrapper.vm
    component.users.value = [mockUser]
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

    await wrapper.find('#username').setValue('')
    await wrapper.find('#email').setValue('invalido')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.users.length).toBe(initialUserCount)
})

let wrapper: any
let component: any

const mockUser: UserPag = {
    userId: 1,
    userName: 'testuser',
    userRole: 'ADMIN',
    toolName: 'Taiga',
    toolId: '123',
    projectName: 'Test Project',
    userPassword: '',
    userEmail: 'test@example.com',
    createdAt: '01/01/2023'
}



test('should set up editing state correctly', () => {
    component.enterEditMode(mockUser)

    expect(component.isEditing).toBe(true)
    expect(component.currentUserId).toBe(1)
    expect(component.newUser).toEqual({
        userName: 'testuser',
        userRole: 'ADMIN',
        toolName: 'Taiga',
        toolId: '123',
        projectName: 'Test Project',
        userPassword: '',
        userEmail: 'test@example.com'
    })
})

test('should reset editing state', () => {
    component.isEditing = true
    component.currentUserId = 1
    component.newUser = { userName: 'test' }

    component.exitEditMode()

    expect(component.isEditing).toBe(false)
    expect(component.currentUserId).toBeNull()
    expect(component.newUser.userName).toBe('')
})

test('should convert display roles to backend format', () => {
    const testCases = [
        { input: 'ADMIN', expected: 'ROLE_ADMIN' },
        { input: 'OPERATOR', expected: 'ROLE_OPERATOR' },
        { input: 'MANAGER', expected: 'ROLE_MANAGER' },
        { input: 'UNKNOWN', expected: 'UNKNOWN' }
    ]

    testCases.forEach(({ input, expected }) => {
        const user: UserPag = { ...mockUser, userRole: input }
        const result = component.rolesReturn(user)
        expect(result.userRole).toBe(expected)
    })
})