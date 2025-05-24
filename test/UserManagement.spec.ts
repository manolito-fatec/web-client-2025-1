import {expect, vi, test, beforeEach} from 'vitest'
import {nextTick} from 'vue'
import {mount} from "@vue/test-utils";
import PrimeVue from 'primevue/config'
import UserManagementView from "../src/views/UserManagementView.vue";
import {createPinia} from "pinia";
import {UserPag} from "../src/types/PagUser";
import {fetchPaginatedUsers} from "../src/api/GetUsersApi";
import {removeUserApi} from "../src/api/RemoveUserApi";

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

createPinia()
vi.mock('../src/api/session/stores/auth.ts', () => ({
    useAuthStore: vi.fn(() => ({
        isAuthenticated: true,
        user: { name: 'Test User' },
        login: vi.fn(),
        logout: vi.fn()
    }))
}))
beforeEach(() => {
    vi.clearAllMocks()

    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    const component = wrapper.vm
    component.users.value = [mockUsers]
})


vi.mock('@/api/GetUsersApi.ts', () => ({
    fetchPaginatedUsers: vi.fn()
}))

vi.mock('@/api/RemoveUserApi.ts', () => ({
    removeUserApi: vi.fn()
}))

vi.mock('@/conversors/RolesConverter.ts', () => ({
    rolesFix: vi.fn((users) => users)
}))

const mockUsers: UserPag[] = [
    {
        userId: 1,
        userName: 'admin1',
        userRole: 'ADMIN',
        userEmail: 'admin1@test.com',
        userPassword: 'pass123',
        toolName: 'Taiga'
    },
    {
        userId: 2,
        userName: 'operator1',
        userRole: 'OPERATOR',
        userEmail: 'operator1@test.com',
        userPassword: 'pass123',
        toolName: 'Trello'
    }
]

beforeEach(() => {
    vi.mocked(fetchPaginatedUsers).mockResolvedValue(mockUsers)
    vi.mocked(removeUserApi).mockResolvedValue({})
})

test('fetches users on mount', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    await nextTick()

    expect(fetchPaginatedUsers).toHaveBeenCalled()
    expect(wrapper.vm.users).toEqual(mockUsers)
})

test('toggles edit mode and sets edited data', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    await wrapper.vm.handleUserEdited(mockUsers[0])

    expect(wrapper.vm.isEditting).toBe(true)
    expect(wrapper.vm.edittedData).toEqual(mockUsers[0])

    await wrapper.vm.toggleEditting()
    expect(wrapper.vm.isEditting).toBe(false)
    expect(wrapper.vm.edittedData).toBeUndefined()
})

test('deletes user and refreshes list', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    await wrapper.vm.handleUserDeleted(1)

    expect(removeUserApi).toHaveBeenCalledWith(1)
    expect(fetchPaginatedUsers).toHaveBeenCalledTimes(3)
})

test('refreshes users list', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    const initialUsers = [...wrapper.vm.users]

    await wrapper.vm.refreshUsers()
    expect(fetchPaginatedUsers).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.users).not.toBe(initialUsers)
})

test('shows NewUserForm when not editing', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    expect(wrapper.findComponent({ name: 'NewUserForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UserEditForm' }).exists()).toBe(false)
})

test('shows UserEditForm when editing', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    await wrapper.vm.handleUserEdited(mockUsers[0])

    expect(wrapper.findComponent({ name: 'NewUserForm' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'UserEditForm' }).exists()).toBe(true)
})

test('handles user creation event', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    const newUserForm = wrapper.findComponent({ name: 'NewUserForm' })

    await newUserForm.vm.$emit('user-created')
    expect(fetchPaginatedUsers).toHaveBeenCalledTimes(3)
})

test('handles edit completion event', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    await wrapper.vm.handleUserEdited(mockUsers[0])
    const editForm = wrapper.findComponent({ name: 'UserEditForm' })

    await editForm.vm.$emit('eddited')
    expect(wrapper.vm.isEditting).toBe(false)
})

test('passes correct props to UserEditForm', async () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    await wrapper.vm.handleUserEdited(mockUsers[0])

    const editForm = wrapper.findComponent({ name: 'UserEditForm' })
    expect(editForm.props('edittedData')).toEqual(mockUsers[0])
})

test('matches snapshot', () => {
    const wrapper = mount(UserManagementView, {
        global: {
            plugins: [PrimeVue]
        }
    })
    expect(wrapper.html()).toMatchSnapshot()
})
