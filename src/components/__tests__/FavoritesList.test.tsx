import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesList from "../favorites";
import "@testing-library/jest-dom";

// Mock de uma rádio favorita para os testes
const mockFavorites = [
    {
        stationuuid: "123",
        name: "Rádio Teste",
        tags: "pop",
        country: "Brasil",
        favicon: "",
        language: "Portuguese",
        url: "http://radio.com/stream",
    },
];

global.Audio = jest.fn().mockImplementation(() => {
    return {
        play: jest.fn().mockImplementation(() => Promise.resolve()), // Simula o sucesso de play() 
        pause: jest.fn(), // Simula a função pause
        src: '' // Para evitar erro ao acessar o src
    };
});

describe("FavoritesList Component", () => {
    test("Deve renderizar a lista de rádios favoritas", () => {
        render(<FavoritesList favorites={mockFavorites} onUpdateFavorites={() => { }} />);

        // Verifica se o nome da rádio está na tela
        expect(screen.getByText("Rádio Teste")).toBeInTheDocument();

        // Verifica se o botão Play está presente
        expect(screen.getByRole("button", { name: /Play/i })).toBeInTheDocument();
    });

    test("Deve tocar e parar uma rádio ao clicar no botão Play/Stop", () => {
        render(<FavoritesList favorites={mockFavorites} onUpdateFavorites={() => { }} />);

        // Seleciona o botão Play
        const playButton = screen.getByRole("button", { name: /Play/i });

        // Simula o clique no botão Play
        fireEvent.click(playButton);

        // Verifica se o botão Stop aparece
        const stopButtons = screen.getAllByRole("button", { name: /Stop/i });
        const stopButton = stopButtons.find(button => button.getAttribute('name') === 'stopPlay');

        // Garantir que o stopButton existe antes de clicar
        if (stopButton) {
            fireEvent.click(stopButton);

            // Verifica se o botão Play volta a aparecer
            const playButtonAfterStop = screen.getByRole("button", { name: /Play/i });
            expect(playButtonAfterStop).toBeInTheDocument();
        } else {
            throw new Error('Botão Stop não encontrado!');
        }
    });

    test("Deve remover uma rádio da lista quando o botão Excluir for clicado", () => {
        const mockUpdateFavorites = jest.fn();

        render(<FavoritesList favorites={mockFavorites} onUpdateFavorites={mockUpdateFavorites} />);

        // Simula o clique no botão Excluir (botão com o ícone de lixeira)
        fireEvent.click(screen.getByRole("button", { name: /Trash/i }));

        // Verifica se a função de atualização foi chamada
        expect(mockUpdateFavorites).toHaveBeenCalledTimes(1);

        const updatedFavorites = JSON.parse(window.localStorage.getItem("favorites") || "[]");
        expect(updatedFavorites).not.toContainEqual(expect.objectContaining({ name: "Rádio Teste" }));
    });
});
