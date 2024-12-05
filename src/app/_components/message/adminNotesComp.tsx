"use client";

import { ADMINNOTE_CREATE, ADMINNOTE_DELETE, ADMINNOTE_OF_MESSAGE } from "@/app/_apolloConfig/graphqlResolvers/adminNoteResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Card, Avatar, Button, Input, Typography, notification } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Text } = Typography;

interface AdminNote {
  id: number;
  note: string;
  adminUser: {
    id: number;
    userName: string;
    role: string;
  };
  createdAt: string;
}

// Unix timestamp'i Türkçe tarih ve saat formatına çeviren fonksiyon
function formatDateTime(unixTimestamp: string) {
  const date = new Date(parseInt(unixTimestamp));
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function AdminNotesComp({ messageId }: { messageId: string }) {
  const { data: notesData, error: notesError, loading: notesLoading, refetch: refetchNotes } = useQuery(ADMINNOTE_OF_MESSAGE, { variables: { input: { messageId: parseInt(messageId) } } });
  const [createNoteMutation, { loading: createLoading }] = useMutation(ADMINNOTE_CREATE);
  const [deleteNoteMutation, { loading: deleteLoading }] = useMutation(ADMINNOTE_DELETE);

  const [newNote, setNewNote] = useState("");

  const handleCreateNote = async () => {
    if (!newNote.trim()) {
      notification.warning({
        message: "Uyarı",
        description: "Lütfen bir not girin.",
      });
      return;
    }

    try {
      await createNoteMutation({
        variables: {
          input: {
            messageId: parseInt(messageId),
            note: newNote,
          },
        },
      });
      setNewNote("");
      refetchNotes();
      notification.success({
        message: "Başarılı",
        description: "Not başarıyla eklendi.",
      });
    } catch (error) {
      notification.error({
        message: "Hata",
        description: "Not eklenirken bir hata oluştu.",
      });
      console.error("Not ekleme hatası:", error);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNoteMutation({
        variables: {
          input: {
            id: noteId,
          },
        },
      });
      refetchNotes();
      notification.success({
        message: "Başarılı",
        description: "Not başarıyla silindi.",
      });
    } catch (error) {
      notification.error({
        message: "Hata",
        description: "Not silinirken bir hata oluştu.",
      });
      console.error("Not silme hatası:", error);
    }
  };

  if (notesLoading) return <div>Yükleniyor...</div>;
  if (notesError) return <div>Hata: {notesError.message}</div>;

  return (
    <div className="p-4 space-y-4">
      {notesData?.adminNotesOfMessage.map((note: AdminNote) => (
        <Card
          key={note.id}
          className="border border-gray-300 bg-blue-50 p-4 relative"
        >
          <div className="flex items-start">
            <Avatar
              className="mr-4 bg-blue-400"
              size="large"
            >
              {note.adminUser.userName[0]}
            </Avatar>
            <div>
              <Text
                strong
                className="text-lg"
              >
                {note.adminUser.userName}
              </Text>
              <p className="text-gray-500 text-sm">{note.adminUser.role}</p>
              <p className="text-gray-500 text-xs">{formatDateTime(note.createdAt)}</p>
              <p className="mt-2">{note.note}</p>
            </div>
            <Button
              type="text"
              danger
              onClick={() => handleDeleteNote(note.id)}
              loading={deleteLoading}
              className="absolute top-2 right-2"
            >
              Sil
            </Button>
          </div>
        </Card>
      ))}

      <div className="p-4 border border-gray-300 bg-blue-50 rounded-lg">
        <TextArea
          rows={4}
          placeholder="Yeni bir not girin..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="mb-2"
        />
        <Button
          type="primary"
          onClick={handleCreateNote}
          loading={createLoading}
          className="bg-blue-500"
        >
          Not Ekle
        </Button>
      </div>
    </div>
  );
}
